import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import { transporter } from './constants';
import { DefaultUser } from 'next-auth';

const emailsDir = path.resolve(process.cwd(), 'src/emails');

interface CreateUserEvent {
  user: DefaultUser;
}

export const sendWelcomeEmail = async ({
  user,
}: CreateUserEvent): Promise<void> => {
  const { email } = user;
  if (email === null) {
    return;
  }
  try {
    const emailFile = readFileSync(path.join(emailsDir, 'welcome-email.html'), {
      encoding: 'utf8',
    });
    const emailTemplate = Handlebars.compile(emailFile);
    await transporter.sendMail({
      from: `"🏝️ Malibou" ${process.env.SMTP_AUTH_USER ?? ''}`,
      to: email,
      subject: 'Welcome to Malibou 🏝️',
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL,
        support_email: process.env.SMTP_AUTH_USER ?? '',
        email,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
