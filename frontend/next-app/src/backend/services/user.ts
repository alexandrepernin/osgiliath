import { Organization, UserMembership } from '@prisma/client';
import { prisma } from './prisma';

export const getUserOrganizationByClerkId = async (
  clerkId: string,
  clerkOrganizationId: string,
): Promise<(UserMembership & { organization: Organization }) | null> => {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { organizations: { include: { organization: true } } },
  });

  return (
    user?.organizations.find(
      ({ organization }) => organization.clerkId === clerkOrganizationId,
    ) ?? null
  );
};
