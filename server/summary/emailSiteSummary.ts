import db from '../orm/models';
import { formatDistance, format } from 'date-fns';
import sendEmail from './sendEmail';
import generateOverallSiteSummary from './generateOverallSiteSummary';
import addNewSummaryToMonitorTable from './addNewSummaryToMonitorTable';
import { EmailStyles } from './emailStyles';
import generateAudienceData from './generateAudienceData';

export default async function emailSiteSummary() {
  const prevUpdate = await db.BC_Monitor.findOne({
    order: [['createdAt', 'DESC']],
  });

  // The first time this is run, there will not be any previous data to compare
  if (!prevUpdate) {
    addNewSummaryToMonitorTable();
    sendEmail(
      process.env.MONITOR_RECIPIENT_EMAILS!,
      'Seed generated for the first update',
      'A seed was generated for the first update.'
    );
    return;
  }

  const nextUpdate = await addNewSummaryToMonitorTable();

  const timeSinceLastUpdate = formatDistance(
    nextUpdate.createdAt,
    prevUpdate.createdAt
  );

  const overallSummary = await generateOverallSiteSummary(
    prevUpdate,
    nextUpdate
  );

  const audienceData = await generateAudienceData();

  const emailBody = `
    <html>
      <body ${EmailStyles.Body}>
        <p>A summary of activity on Bad Calculators over the prior ${timeSinceLastUpdate}.</p>
        ${overallSummary}
        ${audienceData}
      </body>
    </html>
  `;

  const date = format(Date.now(), 'M/d/yy');
  // sendEmail(
  //   process.env.MONITOR_RECIPIENT_EMAILS!,
  //   `Bad Calculators Stats (${date})`,
  //   emailBody
  // ).catch(console.error);
}
