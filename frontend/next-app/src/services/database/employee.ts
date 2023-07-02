import { Employee, User } from '@prisma/client';
import { prisma } from 'services/database/prisma';

export const createEmployee = async (
  employee: Pick<User, 'email'> & Partial<Employee>,
): Promise<User> => {
  const { email, firstName, lastName, jobTitle } = employee;
  const createdEmployee = await prisma.user.create({
    data: {
      email: email?.toLowerCase(),
      firstName,
      lastName,
      employee: {
        create: {
          firstName,
          lastName,
          jobTitle,
        },
      },
    },
  });

  return createdEmployee;
};
