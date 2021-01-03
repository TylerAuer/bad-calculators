import { GAData, GAMetrics } from '../../app/src/structs/update';
import { EmailStyles } from './emailStyles';
import { AlphaAnalyticsDataClient } from '@google-analytics/data';

export default async function generateAudienceData(): Promise<string> {
  const data = await queryGoogleAnalytics();

  const totalAudienceData = generateTotalAudienceDataTable(data);
  const yesterdayPuzzleData = generatePuzzleVisitData(
    data.yesterday,
    'Puzzle Data Yesterday'
  );
  const lastWeekPuzzleData = generatePuzzleVisitData(
    data.lastWeek,
    'Puzzle Data Last Week'
  );

  return `
    ${totalAudienceData}
    ${yesterdayPuzzleData}
    ${lastWeekPuzzleData}
  `;
}

function generateTotalAudienceDataTable(data: GAData): string {
  const yesterdayData = Object.entries(data.yesterday.total);
  const lastWeekData = Object.entries(data.lastWeek.total);
  const rows: string[] = [];

  for (let i = 0; i < yesterdayData.length; i++) {
    rows.push(`  
      <tr>
        <td ${EmailStyles.TableCell}>${yesterdayData[i][0]}</td>
        <td ${EmailStyles.TableCell}>${yesterdayData[i][1]}</td>
        <td ${EmailStyles.TableCell}>${lastWeekData[i][1]}</td>
      </tr>
    `);
  }

  return `
    <div ${EmailStyles.MajorHeading}>
      Audience Data
    </div>
    <table ${EmailStyles.Table}>
      <tr>
        <th></th>
        <th ${EmailStyles.TableCell}>Yesterday</th>
        <th ${EmailStyles.TableCell}>Last Week</th>
      </tr>
      ${rows.join('')}
    </table>
  `;
}

function generatePuzzleVisitData(
  metricsForDateRange: GAData['yesterday'] | GAData['lastWeek'],
  tableTitle: string
): string {
  const puzzleData: { [key: string]: GAMetrics } = {};
  Object.entries(metricsForDateRange).forEach(([path, metrics]) => {
    if (!path.includes('puzzle')) return;
    puzzleData[path] = metrics;
  });

  const sortedPuzzleData = Object.entries(puzzleData).sort((a, b) => {
    if (a[1].screenPageViews > b[1].screenPageViews) return -1;
    else if (a[1].screenPageViews < b[1].screenPageViews) return 1;
    else {
      if (a[1].activeUsers > b[1].activeUsers) return -1;
      else if (a[1].activeUsers < b[1].activeUsers) return 1;
      else return 0;
    }
  });

  const rows = sortedPuzzleData.map(
    (d) => `
    <tr>
      <td ${EmailStyles.TableCell}>${d[0]}</td>
      <td ${EmailStyles.TableCell}>${d[1].screenPageViews}</td>
      <td ${EmailStyles.TableCell}>${d[1].activeUsers}</td>
      <td ${EmailStyles.TableCell}>${d[1].engagementRate}</td>
    </tr>
    `
  );

  return `
    <div ${EmailStyles.MajorHeading}>
      ${tableTitle}
    </div>
    <table ${EmailStyles.Table}>
      <tr>
        <th></th>
        <th ${EmailStyles.TableCell}>Page Views</th>
        <th ${EmailStyles.TableCell}>Active Users</th>
        <th ${EmailStyles.TableCell}>Engagement Rate</th>
      </tr>
      ${rows.join('')}
    </table>
  `;
}

async function queryGoogleAnalytics(): Promise<GAData> {
  // SCHEMA
  // https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema
  // https://googleapis.dev/nodejs/analytics-data/latest/index.html

  const propertyId = '257338238';

  // Creates a client
  const client = new AlphaAnalyticsDataClient();

  // Runs a simple report.
  async function runReport() {
    const [response] = await client.runReport({
      limit: 10000,
      entity: {
        propertyId: propertyId,
      },
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: '1daysAgo',
          name: 'lastWeek',
        },
        {
          startDate: '1daysAgo',
          endDate: '1daysAgo',
          name: 'yesterday',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name: 'engagedSessions',
        },
        {
          name: 'engagementRate',
        },
        {
          name: 'screenPageViews',
        },
        {
          name: 'totalUsers',
        },
        {
          name: 'userEngagementDuration',
        },
      ],
    });

    const { rows } = response;
    console.log(JSON.stringify(rows, null, 2));

    const data: GAData = {
      yesterday: {},
      lastWeek: {},
    };

    rows!.forEach((row) => {
      const date = row.dimensionValues![1].value as 'yesterday' | 'lastWeek';
      const path = row.dimensionValues![0].value!;

      // Sort data into object
      const labeledRow = {
        activeUsers: parseInt(row.metricValues![0].value!),
        engagedSessions: parseInt(row.metricValues![1].value!),
        engagementRate: parseFloat(row.metricValues![2].value!),
        screenPageViews: parseInt(row.metricValues![3].value!),
        totalUsers: parseInt(row.metricValues![4].value!),
        userEngagementDuration: parseInt(row.metricValues![5].value!),
      };
      data[date][path!] = labeledRow;

      // Update the totals
      if (!data[date].total) {
        data[date].total = {
          activeUsers: 0,
          engagedSessions: 0,
          screenPageViews: 0,
          totalUsers: 0,
        };
      }

      data[date].total.activeUsers += parseInt(row.metricValues![0].value!);
      data[date].total.engagedSessions += parseInt(row.metricValues![1].value!);
      data[date].total.screenPageViews += parseInt(row.metricValues![3].value!);
      data[date].total.totalUsers += parseInt(row.metricValues![4].value!);
    });

    return data;
  }

  return runReport();
}
