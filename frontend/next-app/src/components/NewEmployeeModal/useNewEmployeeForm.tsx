import { useOrganization } from '@clerk/nextjs';
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

export const useNewEmployeeForm = (startDate: Date | null): Return => {
  const router = useRouter();
  const [customErrorMessage, setCustomErrorMessage] = useState('');
  const { organization } = useOrganization();

  const onSubmit = useCallback(
    async ({ email, firstName, lastName, jobTitle }: FormValues) => {
      if (organization === null || organization === undefined) {
        throw new Error('Organization is null');
      }

      setCustomErrorMessage('');

      try {
        const response = await fetchCreateEmployee({
          email,
          firstName,
          lastName,
          jobTitle,
          startDate,
        });
        // to do: allow admins to invite admins
        await organization.inviteMember({
          emailAddress: email,
          role: 'basic_member',
        });
        await router.push(`/employee/${response.id}`);
      } catch (error: unknown) {
        setCustomErrorMessage("Can't create employee");
      }
    },
    [router, startDate, organization],
  );

  return { onSubmit, customErrorMessage };
};
