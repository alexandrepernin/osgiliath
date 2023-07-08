import { Organization, User, UserMembership } from '@prisma/client';
import { prisma } from './prisma';

export const getOrganizationMembers = async (
  clerkOrganizationId: string,
): Promise<
  (Organization & { users: (UserMembership & { user: User })[] }) | null
> => {
  const organizationAndMembers = await prisma.organization.findUnique({
    where: { clerkId: clerkOrganizationId },
    include: { users: { include: { user: true } } },
  });

  return organizationAndMembers;
};
