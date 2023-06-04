import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import { transporter } from './constants';

const emailsDir = path.resolve(process.cwd(), 'src/emails');

export const sendForgotPassword = async (
  email: string,
  token: string,
): Promise<void> => {
  try {
    const emailFile = readFileSync(
      path.join(emailsDir, 'forgot-password-email.html'),
      {
        encoding: 'utf8',
      },
    );
    const emailTemplate = Handlebars.compile(emailFile);
    const resetPasswordUrl = `${
      process.env.NEXT_PUBLIC_URL ?? ''
    }reset-password?token=${token}&email=${encodeURI(email)}`;
    await transporter.sendMail({
      from: `"🏝️ Malibou" ${process.env.SMTP_AUTH_USER ?? ''}`,
      to: email,
      subject: 'Your reset password link for Malibou',
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL,
        reset_url: resetPasswordUrl,
        email,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
