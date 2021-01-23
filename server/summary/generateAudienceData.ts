import { EmailStyles } from './emailStyles';
import { AlphaAnalyticsDataClient } from '@google-analytics/data';

const propertyId = '257338238';

type DBPuzData = {
  id: number;
  level: number;
  indexInLevel: number;
  attempts: number;
  successes: number;
  successPercent: number;
};

export default async function generateAudienceData(
  puzDataFromDB
): Promise<string> {
  const siteData = await queryGAForSiteLevelStats();
  const puzData = await queryGAForPuzzleStats();

  const siteDataTable = `
    <div ${EmailStyles.MajorHeading}>Site Visitor Data</div>
    <table ${EmailStyles.Table}>
      <tr>
        <th ${EmailStyles.TableCell}></th>
        <th ${EmailStyles.TableCell}>Yesterday</th>
        <th ${EmailStyles.TableCell}>Last Week</th>
        <th ${EmailStyles.TableCell}>Last Month</th>
      </tr>
      <tr>
        <td ${EmailStyles.TableCell}>Users</td>
        <td ${EmailStyles.TableCell}>
          ${siteData.yesterday.totalUsers.toLocaleString()}
        </td>
        <td ${EmailStyles.TableCell}>
          ${siteData.lastWeek.totalUsers.toLocaleString()}
        </td>
        <td ${EmailStyles.TableCell}>
          ${siteData.lastMonth.totalUsers.toLocaleString()}
        </td>
      </tr>
      <tr>
        <td ${EmailStyles.TableCell}>Page Views</td>
        <td ${EmailStyles.TableCell}>
          ${siteData.yesterday.screenPageViews.toLocaleString()}
        </td>
        <td ${EmailStyles.TableCell}>
          ${siteData.lastWeek.screenPageViews.toLocaleString()}
        </td>
        <td ${EmailStyles.TableCell}>
          ${siteData.lastMonth.screenPageViews.toLocaleString()}
        </td>
      </tr>
    </table>
  `;

  const sortedPuzData = sortPuzzleData(puzData);
  const puzzleStats: { [id: string]: DBPuzData } = {};

  puzDataFromDB.forEach((puz) => {
    const successPercent =
      100 * (puz.BC_Tracking.totalSuccesses / puz.BC_Tracking.totalAttempts);

    puzzleStats[puz.id] = {
      id: puz.id,
      level: puz.level,
      indexInLevel: puz.indexInLevel,
      attempts: puz.BC_Tracking.totalAttempts,
      successes: puz.BC_Tracking.totalSuccesses,
      successPercent: successPercent,
    };
  });

  const puzRows = sortedPuzData
    .map((d) => {
      const path = d[0];
      const url = 'http://badcalculators.com' + path;
      const puzId = path.match(/\/#\/puzzle\/(\d*)/)![1];

      /**
       * If a user tries to visit a puzzle id that isn't an actual puzzle, the
       * site redirects to /#/puzzle/0 but Google Analytics still logs the page
       * view as, for example, /#/puzzle/4500. So, when this function tries to
       * look up the stats for puzzle 4500 it is undefined and this function
       * crashes. This check prevents that.
       */
      if (!puzzleStats[puzId]) return '';

      const lvlAndIndex = `${puzzleStats[puzId].level}-${puzzleStats[puzId].indexInLevel}`;

      const lastMonthUsers = d[1].lastMonth.totalUsers.toLocaleString();
      const lastWeekUsers = d[1].lastWeek.totalUsers.toLocaleString();
      const yesterdayUsers = d[1].yesterday.totalUsers.toLocaleString();

      const lastMonthPageViews = d[1].lastMonth.screenPageViews.toLocaleString();
      const lastWeekPageViews = d[1].lastWeek.screenPageViews.toLocaleString();
      const yesterdayPageViews = d[1].yesterday.screenPageViews.toLocaleString();

      return `
        <tr>
          <td ${EmailStyles.TableCell}>
            <a href='${url}'>${lvlAndIndex}</a>
          </td>
          <td ${EmailStyles.TableCell}>
            ${lastMonthUsers} / ${lastMonthPageViews}
          </td>
          <td ${EmailStyles.TableCell}>
            ${lastWeekUsers} / ${lastWeekPageViews}
          </td>
          <td ${EmailStyles.TableCell}>
            ${yesterdayUsers} / ${yesterdayPageViews}
          </td>
          <td ${EmailStyles.TableCell}>
            ${puzzleStats[puzId].successPercent.toPrecision(3)}%
          </td>
        </tr>
    `;
    })
    .join('');

  const puzTable = `
  <div ${EmailStyles.MajorHeading}>Puzzle Data</div>
    <table ${EmailStyles.Table}>
      <tr>
        <th ${EmailStyles.TableCell}>Puzzle</th>
        <th ${EmailStyles.TableCell}>Last Month<br>(users / views)</th>
        <th ${EmailStyles.TableCell}>Last Week<br>(users / views)</th>
        <th ${EmailStyles.TableCell}>Yesterday<br>(users / views)</th>
        <th ${EmailStyles.TableCell}>Success %</th>
      </tr>
      ${puzRows}
    </table>
  `;

  return `
    ${siteDataTable}
    ${puzTable}
  `;
}

function sortPuzzleData(
  data: GAPuzzleStatsByURL
): [string, GAPuzzleDataRanges][] {
  const sortedPuzzleData = Object.entries(data).sort((a, b) => {
    const lastMonth = b[1].lastMonth.totalUsers - a[1].lastMonth.totalUsers;
    const lastWeek = b[1].lastWeek.totalUsers - a[1].lastWeek.totalUsers;
    const yesterday = b[1].yesterday.totalUsers - a[1].yesterday.totalUsers;

    // Sort by month, then week, then yesterday
    if (lastMonth === 0) {
      if (lastWeek === 0) {
        return yesterday;
      } else return lastWeek;
    } else return lastMonth;
  });

  return sortedPuzzleData;
}

type GASiteStat = {
  totalUsers: number;
  screenPageViews: number;
};

type GASiteData = {
  lastMonth: GASiteStat;
  lastWeek: GASiteStat;
  yesterday: GASiteStat;
};

async function queryGAForSiteLevelStats(): Promise<GASiteData> {
  // SCHEMA
  // https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema
  // https://googleapis.dev/nodejs/analytics-data/latest/index.html

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
          startDate: '30daysAgo',
          endDate: '1daysAgo',
          name: 'lastMonth',
        },
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
          name: 'platform',
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
        {
          name: 'screenPageViews',
        },
      ],
    });

    const { rows } = response;

    const gaSiteData: GASiteData = {
      lastMonth: {
        totalUsers: 0,
        screenPageViews: 0,
      },
      lastWeek: {
        totalUsers: 0,
        screenPageViews: 0,
      },
      yesterday: {
        totalUsers: 0,
        screenPageViews: 0,
      },
    };

    rows!.forEach((row) => {
      const dateRange = row.dimensionValues![1].value as string;

      gaSiteData[dateRange].totalUsers = parseInt(row.metricValues![0].value!);
      gaSiteData[dateRange].screenPageViews = parseInt(
        row.metricValues![1].value!
      );
    });

    return gaSiteData;
  }

  return runReport();
}

type GAPuzzleMetrics = { totalUsers: number; screenPageViews: number };

type GAPuzzleDataRanges = {
  lastMonth: GAPuzzleMetrics;
  lastWeek: GAPuzzleMetrics;
  yesterday: GAPuzzleMetrics;
};

type GAPuzzleStatsByURL = {
  [pathFromUrl: string]: GAPuzzleDataRanges;
};

async function queryGAForPuzzleStats(): Promise<GAPuzzleStatsByURL> {
  // SCHEMA
  // https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema
  // https://googleapis.dev/nodejs/analytics-data/latest/index.html

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
          startDate: '30daysAgo',
          endDate: '1daysAgo',
          name: 'lastMonth',
        },
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
          name: 'totalUsers',
        },
        {
          name: 'screenPageViews',
        },
      ],
    });

    const { rows } = response;

    const gaPuzData: GAPuzzleStatsByURL = {};

    rows!.forEach((row) => {
      const url = row.dimensionValues![0].value as string;
      const dateRange = row.dimensionValues![1].value as string;

      // Only include puzzle URLs
      if (!url.includes('/#/puzzle/')) return;

      if (!gaPuzData[url]) {
        gaPuzData[url] = {
          lastMonth: { totalUsers: 0, screenPageViews: 0 },
          lastWeek: { totalUsers: 0, screenPageViews: 0 },
          yesterday: { totalUsers: 0, screenPageViews: 0 },
        };
      }

      gaPuzData[url][dateRange].totalUsers = parseInt(
        row.metricValues![0].value!
      );
      gaPuzData[url][dateRange].screenPageViews = parseInt(
        row.metricValues![1].value!
      );
    });

    return gaPuzData;
  }

  return runReport();
}
