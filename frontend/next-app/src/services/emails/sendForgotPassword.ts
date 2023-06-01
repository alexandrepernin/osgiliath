import { transporter } from './constants';

export const sendForgotPassword = async (
  email: string,
  token: string,
): Promise<void> => {
  try {
    await Promise.resolve();
    const url = `${
      process.env.NEXT_PUBLIC_URL ?? ''
    }reset-password?token=${token}&email=${encodeURI(email)}`;
    await transporter.sendMail({
      from: process.env.SMTP_AUTH_USER,
      to: [email],
      subject: 'Reset your password',
      text: `Click on this link to reset your password: ${url}`,
    });
  } catch (error) {
    console.error(error);
  }
};
