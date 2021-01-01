import db from '../orm/models';
import { formatDistance } from 'date-fns';
import sendEmail from './sendEmail';
import generateOverallSiteSummary from './generateOverallSiteSummary';
import addNewSummaryToMonitorTable from './addNewSummaryToMonitorTable';
import { EmailStyles } from './emailStyles';

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

  /**
   * - Daily info from Google Analytics
   * - - Number of users
   * - - Number of new users
   * - - Sources
   */

  const timeSinceLastUpdate = formatDistance(
    nextUpdate.createdAt,
    prevUpdate.createdAt
  );

  const overallSummary = await generateOverallSiteSummary(
    prevUpdate,
    nextUpdate
  );

  const emailBody = `
  <html>
    <body ${EmailStyles.Body}>
      <p>A summary of activity on Bad Calculators over the prior ${timeSinceLastUpdate}.</p>
      ${overallSummary}
    </body>
  </html>
  `;

  // sendEmail(
  //   process.env.MONITOR_RECIPIENT_EMAILS!,
  //   'Daily Update',
  //   emailBody
  // ).catch(console.error);
}
