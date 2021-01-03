import { CronJob } from 'cron';
import emailSiteSummary from '../summary/emailSiteSummary';

export default async function startCronJobs() {
  const siteSummaryEmailJob = new CronJob(
    '1 0 * * *',
    emailSiteSummary,
    null,
    undefined,
    'America/Los_Angeles'
  );

  siteSummaryEmailJob.start();
}
