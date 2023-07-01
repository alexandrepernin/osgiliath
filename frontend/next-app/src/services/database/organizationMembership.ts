import { OrganizationMembershipJSON } from '@clerk/clerk-sdk-node';
import { UserMembership } from '@prisma/client';
import { prisma } from 'services/database/prisma';

const modelizer = (
  membership: OrganizationMembershipJSON,
): Pick<UserMembership, 'role' | 'clerkId'> & {
  organizationClerkId: string;
  userClerkId: string;
} => {
  return {
    role: membership.role,
    clerkId: membership.id,
    organizationClerkId: membership.organization.id,
    userClerkId: membership.public_user_data.user_id,
  };
};

export const createOrganizationMembership = async (
  clerkOrganization: OrganizationMembershipJSON,
): Promise<void> => {
  const membership = modelizer(clerkOrganization);
  await prisma.userMembership.create({
    data: {
      clerkId: membership.clerkId,
      role: membership.role,
      organization: {
        connect: {
          clerkId: membership.organizationClerkId,
        },
      },
      user: { connect: { clerkId: membership.userClerkId } },
    },
  });
};

export const updateOrganizationMembership = async (
  clerkOrganization: OrganizationMembershipJSON,
): Promise<void> => {
  const membership = modelizer(clerkOrganization);

  if (membership.clerkId === null) {
    throw new Error('No clerkId found');
  }

  await prisma.userMembership.update({
    where: {
      clerkId: membership.clerkId,
    },
    data: {
      clerkId: membership.clerkId,
      role: membership.role,
      organization: {
        connect: {
          clerkId: membership.organizationClerkId,
        },
      },
      user: { connect: { clerkId: membership.userClerkId } },
    },
  });
};

export const deleteOrganizationMembership = async (
  clerkOrganization: OrganizationMembershipJSON,
): Promise<void> => {
  const membership = modelizer(clerkOrganization);

  if (membership.clerkId === null) {
    throw new Error('No clerkId found');
  }

  await prisma.userMembership.delete({
    where: {
      clerkId: membership.clerkId,
    },
  });
};
