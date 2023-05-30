import { transporter } from './constants';

export const sendForgotPassword = async (
  email: string,
  token: string,
): Promise<void> => {
  try {
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
