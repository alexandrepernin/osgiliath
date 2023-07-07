import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { fetchCreateEmployee } from 'services/api-client/fetchCreateEmployee';

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
}

interface Return {
  onSubmit: SubmitHandler<FormValues>;
  customErrorMessage?: string;
}

export const useNewEmployeeForm = (startDate: Date): Return => {
  const router = useRouter();
  const [customErrorMessage, setCustomErrorMessage] = useState('');

  const onSubmit = useCallback(
    async ({ email, firstName, lastName, jobTitle }: FormValues) => {
      setCustomErrorMessage('');

      try {
        const response = await fetchCreateEmployee({
          email,
          firstName,
          lastName,
          jobTitle,
          startDate,
        });
        await router.push(`/employee/${response.id}`);
      } catch (error: unknown) {
        setCustomErrorMessage("Can't create employee");
      }
    },
    [router, startDate],
  );

  return { onSubmit, customErrorMessage };
};
