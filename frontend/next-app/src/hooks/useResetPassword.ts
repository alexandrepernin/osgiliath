import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { SubmitHandler } from 'react-hook-form';
import { resetPassword } from 'services/api-client/resetPassword';

interface FormValues {
  password: string;
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
    async ({ password }: FormValues) => {
      setCustomErrorMessage('');

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
