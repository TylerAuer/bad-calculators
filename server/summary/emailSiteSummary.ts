import sendEmail from './sendEmail';
import generateOverallSiteSummary from './generateOverallSiteSummary';

export default async function emailSiteSummary() {
  /**
   * Called by a chron job manager
   *
   * Collect info about the site:
   * - Daily Info from server
   * - - Attempts
   * - - Solutions
   * - - Fails
   * - - New users
   * - Daily info from Google Analytics
   * - - Number of users
   * - - Number of new users
   * - - Sources
   *
   * Store data in a new row of a table in the DB so it can be referenced
   *
   * Sythesize data and email it to myself
   *
   *
   */

  const overallSummary = await generateOverallSiteSummary();

  sendEmail(
    process.env.MONITOR_RECIPIENT_EMAILS!,
    'Daily Update',
    overallSummary
  ).catch(console.error);
}
