import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';

import { Pages } from 'constants/pages';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';

interface FormValues {
  email: string;
  password: string;
}

interface Return {
  onSubmit: SubmitHandler<FormValues>;
  customErrorMessage?: string;
}

export const useSignin = (): Return => {
  const [customErrorMessage, setCustomErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data: FormValues) => {
      setCustomErrorMessage('');
      const response = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: Pages.HOME,
      });
      if (response === undefined || response.error !== undefined) {
        setCustomErrorMessage('Invalid credentials. Please try again.');

        return;
      }
      await router.push(Pages.HOME);
    },
    [router],
  );

  return { onSubmit, customErrorMessage };
};
