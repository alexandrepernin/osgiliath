import { ApiRoutes } from 'constants/pages';

interface ForgotPasswordData {
  email: string;
}

export class ForgotPasswordError extends Error {}

export const forgotPassword = async (
  data: ForgotPasswordData,
): Promise<void> => {
  const { email } = data;
  try {
    await fetch(ApiRoutes.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new ForgotPasswordError();
  }
};
