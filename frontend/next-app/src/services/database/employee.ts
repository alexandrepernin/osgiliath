import { Employee, Role, User } from '@prisma/client';
import { prisma } from 'services/database/prisma';

export const createEmployee = async (
  employee: Pick<User, 'email'> & Partial<Employee>,
  orgId: number,
  role: Role,
): Promise<User> => {
  const { email, firstName, lastName, jobTitle, startDate } = employee;
  const createdEmployee = await prisma.user.create({
    data: {
      email: email?.toLowerCase(),
      firstName,
      lastName,
      organizations: {
        create: [
          {
            organizationId: orgId,
            role,
          },
        ],
      },
      employee: {
        create: {
          firstName,
          lastName,
          jobTitle,
          startDate,
        },
      },
    },
  });

  return createdEmployee;
};

export const getOrganizationEmployees = async (
  clerkOrganizationId: string,
): Promise<Employee[]> => {
  const organizationAndMembers = await prisma.organization.findUnique({
    where: { clerkId: clerkOrganizationId },
    include: { users: { include: { user: { include: { employee: true } } } } },
  });

  const users = organizationAndMembers?.users.map(({ user }) => user);
  if (users === undefined) {
    return [];
  }

  return users
    .filter(user => user.employee !== null)
    .map(({ employee }) => employee) as Employee[];
};
