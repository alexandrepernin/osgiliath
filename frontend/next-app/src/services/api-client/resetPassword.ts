import { ApiRoutes } from 'constants/pages';

interface ResetPasswordData {
  password: string;
  token: string | null;
}

export class ResetPasswordError extends Error {}

export const resetPassword = async (data: ResetPasswordData): Promise<void> => {
  const { password, token } = data;
  try {
    await fetch(ApiRoutes.RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ password, token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new ResetPasswordError();
  }
};
