import { useCallback } from 'react';

import { SubmitHandler } from 'react-hook-form';
import { forgotPassword } from 'services/api-client/forgotPassword';

interface FormValues {
  email: string;
}

interface Return {
  onSubmit: SubmitHandler<FormValues>;
}

export const useForgotPassword = (): Return => {
  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data: FormValues) => {
      await forgotPassword({ email: data.email });
    },
    [],
  );

  return { onSubmit };
};
