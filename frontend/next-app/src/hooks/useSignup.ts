import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { signup } from 'services/api-client/signup';

interface FormValues {
  email: string;
  password: string;
}

interface Return {
  onSubmit: SubmitHandler<FormValues>;
  customErrorMessage?: string;
}

export const useSignup = (): Return => {
  const [customErrorMessage, setCustomErrorMessage] = useState('');

  const onSubmit = useCallback(async ({ email, password }: FormValues) => {
    setCustomErrorMessage('');

    try {
      await signup({ email, password });
      await signIn('email', {
        callbackUrl: process.env.NEXT_PUBLIC_URL ?? '',
        email,
      });
    } catch (error: unknown) {
      setCustomErrorMessage("Can't create account");
    }
  }, []);

  return { onSubmit, customErrorMessage };
};
