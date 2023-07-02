import { User } from '@prisma/client';
import { ApiRoutes } from 'constants/pages';

interface FetchCreateEmployeeData {
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
}

export class FetchCreateEmployeeError extends Error {}

export const fetchCreateEmployee = async (
  data: FetchCreateEmployeeData,
): Promise<User> => {
  const { email, firstName, lastName, jobTitle } = data;
  try {
    const res = await fetch(ApiRoutes.CREATE_EMPLOYEE, {
      method: 'POST',
      body: JSON.stringify({ email, firstName, lastName, jobTitle }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return (await res.json()) as User;
  } catch (error) {
    throw new FetchCreateEmployeeError();
  }
};
