import nodemailer from 'nodemailer';

export function createPrimusMailer() {
  return nodemailer.createTransport({
    host: process.env.PRIMUS_SMTP_HOST,
    port: process.env.PRIMUS_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.PRIMUS_SMTP_USER,
      pass: process.env.PRIMUS_SMTP_PASS
    }
  });
}
