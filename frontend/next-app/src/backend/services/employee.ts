import {
  Employee as EmployeeModel,
  Role,
  User as UserModel,
} from '@prisma/client';
import { prisma } from './prisma';
import { Employee } from 'types/Employee';

export const employeeModelToEmployee = (
  user: UserModel & { employee: EmployeeModel },
): Employee => {
  const { employee } = user;

  return {
    id: employee.id,
    firstName: employee.firstName ?? '',
    lastName: employee.lastName ?? '',
    jobTitle: employee.jobTitle ?? '',
    startDate: !employee.startDate ? '' : employee.startDate.toISOString(),
    email: user.email ?? '',
    image: user.image,
  };
};

export const createEmployee = async (
  employee: Pick<UserModel, 'email'> & Partial<EmployeeModel>,
  orgId: number,
  role: Role,
): Promise<UserModel> => {
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
  if (organizationAndMembers === null) {
    return [];
  }

  const users = organizationAndMembers.users.map(({ user }) => user);

  const employees = users.filter(
    user => user.employee !== null,
  ) as (UserModel & { employee: EmployeeModel })[];

  return employees.map(employeeModelToEmployee);
};
