interface SignupData {
  email: string;
  password: string;
}

export class SignupError extends Error {}

export const signup = async (data: SignupData): Promise<void> => {
  const { email, password } = data;
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await res.json();
  } catch (error) {
    throw new SignupError();
  }
};
