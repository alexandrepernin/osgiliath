import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { SubmitHandler } from 'react-hook-form';
import { resetPassword } from 'services/api-client/resetPassword';

interface FormValues {
  password: string;
  passwordConfirmation: string;
}

interface Return {
  onSubmit: SubmitHandler<FormValues>;
  customErrorMessage?: string;
}

export const useResetPassword = (): Return => {
  const { query } = useRouter();
  const token = query.token as string | null;
  const [customErrorMessage, setCustomErrorMessage] = useState('');
  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async ({ password, passwordConfirmation }: FormValues) => {
      setCustomErrorMessage('');
      if (password !== passwordConfirmation) {
        setCustomErrorMessage('Passwords do not match');

        return;
      }

      try {
        await resetPassword({ password, token });
      } catch (error) {
        setCustomErrorMessage('An error occurred, please try again later');
      }
    },
    [token],
  );

  return { onSubmit, customErrorMessage };
};
