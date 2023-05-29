import { signIn } from 'next-auth/react';
import { ChangeEvent, useCallback, useState } from 'react';

import { Pages } from 'constants/pages';
import { signup } from 'services/api-client/signup';

interface FormValues {
  email: string;
  password: string;
}

interface Return {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  formValues: FormValues;
}

export const useSignup = (): Return => {
  const [, setLoading] = useState(false);
  const [, setError] = useState('');
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });

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
      setLoading(true);
      setFormValues({ email: '', password: '' });

      try {
        await signup(formValues);
        setLoading(false);
        await signIn(undefined, { callbackUrl: Pages.HOME });
      } catch (error: unknown) {
        setLoading(false);
        setError("Can't create account");
      }
    },
    [formValues],
  );

  return { handleInputChange, onSubmit, formValues };
};
