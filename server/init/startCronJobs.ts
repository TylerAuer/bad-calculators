import { CronJob } from 'cron';
import emailSiteSummary from '../summary/emailSiteSummary';

export default async function startCronJobs() {
  const siteSummaryEmailJob = new CronJob('1 0 * * *', emailSiteSummary);
  siteSummaryEmailJob.start();

  const rapidEmailCron = new CronJob('* * * * *', emailSiteSummary);
  rapidEmailCron.start();
}
