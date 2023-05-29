import nodemailer from 'nodemailer';

const SMTP_HOST = 'smtp-relay.sendinblue.com';
const SMTP_PORT = 587;

export const sendForgotPassword = async (
  email: string,
  token: string,
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASSWORD,
      },
    });
    const mailStatus = await transporter.sendMail({
      from: process.env.SMTP_AUTH_USER,
      to: [email],
      subject: 'Reset your password',
      text: `Click on this link to reset your password: ${
        process.env.NEXT_PUBLIC_URL ?? ''
      }reset-password?token=${token}`,
    });
    console.log({ mailStatus });
  } catch (error) {
    console.error(error);
  }
};
