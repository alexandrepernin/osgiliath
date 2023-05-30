import nodemailer from 'nodemailer';

const SMTP_HOST = 'smtp-relay.sendinblue.com';
const SMTP_PORT = 587;

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASSWORD,
  },
});
