import nodemailer from 'nodemailer';

export default async function sendEmail(
  to: string,
  subject: string,
  htmlBody: string
) {
  const from = process.env.MONITOR_SENDER_EMAIL;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: from,
      pass: process.env.MONITOR_SENDER_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Bad Calculators <${from}>`,
    to: to,
    subject: subject,
    html: htmlBody,
  });

  console.log(`Email sent with id ${info.messageId}.`);
}
