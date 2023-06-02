import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import { transporter } from './constants';

const emailsDir = path.resolve(process.cwd(), 'src/emails');

export const sendVerificationRequest = async ({
  identifier,
  url,
}: {
  identifier: string;
  url: string;
}): Promise<void> => {
  try {
    const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
      encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailFile);
    await transporter.sendMail({
      from: `"🏝️ Malibou" ${process.env.SMTP_AUTH_USER ?? ''}`,
      to: identifier,
      subject: 'Your sign-in link for Malibou',
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL,
        signin_url: url,
        email: identifier,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
