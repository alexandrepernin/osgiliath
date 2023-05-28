import { signIn } from 'next-auth/react';
import { ChangeEvent, useCallback, useState } from 'react';

import { Pages } from 'constants/pages';
import { useRouter } from 'next/router';

interface FormValues {
  email: string;
  password: string;
}

interface Return {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  formValues: FormValues;
}

export const useSignin = (): Return => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target as { name: string; value: string };
      setFormValues({ ...formValues, [name]: value });
    },
    [formValues],
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFormValues({ email: '', password: '' });

      const response = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl: Pages.HOME,
      });
      if (response === undefined || response.error !== undefined) {
        // to do : invalid credentials error message
        console.log({ response });
      }
      await router.push(Pages.HOME);
    },
    [router, formValues],
  );

  return { handleInputChange, onSubmit, formValues };
};
