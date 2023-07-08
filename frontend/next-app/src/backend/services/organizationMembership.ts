import { OrganizationMembershipJSON } from '@clerk/clerk-sdk-node';
import { prisma } from './prisma';
import { getOrganizationMembers } from './organization';

const modelizer = (membership: OrganizationMembershipJSON) => {
  return {
    role: membership.role,
    clerkId: membership.id,
    organizationClerkId: membership.organization.id,
    userClerkId: membership.public_user_data.user_id,
  };
};

export const syncOrganizationMembership = async (
  clerkOrganizationMembership: OrganizationMembershipJSON,
): Promise<void> => {
  const membership = modelizer(clerkOrganizationMembership);
  const organization = await getOrganizationMembers(
    membership.organizationClerkId,
  );
  if (organization === null) {
    throw new Error('Organization not found');
  }
  const retrievedMember = organization.users.find(
    member => member.user.clerkId === membership.userClerkId,
  );
  if (retrievedMember) {
    await prisma.userMembership.update({
      where: {
        userId_organizationId: {
          userId: retrievedMember.user.id,
          organizationId: organization.id,
        },
      },
      data: {
        clerkId: membership.clerkId,
      },
    });

    return;
  }

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

  await prisma.userMembership.delete({
    where: {
      clerkId: membership.clerkId,
    },
  });
};
