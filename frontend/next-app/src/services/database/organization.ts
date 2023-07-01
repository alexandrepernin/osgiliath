import { DeletedObjectJSON, OrganizationJSON } from '@clerk/clerk-sdk-node';
import { Organization, User } from '@prisma/client';
import { prisma } from 'services/database/prisma';

const modelizer = (organization: OrganizationJSON): Partial<Organization> => {
  return {
    name: organization.name,
    clerkId: organization.id,
    image: organization.image_url,
    slug: organization.slug,
  };
};

export const getOrganizationMembers = async (
  clerkOrganizationId: string,
): Promise<User[]> => {
  const organizationAndMembers = await prisma.organization.findUnique({
    where: { clerkId: clerkOrganizationId },
    include: { users: { include: { user: true } } },
  });

  return organizationAndMembers?.users.map(({ user }) => user) ?? [];
};

export const createOrganization = async (
  clerkOrganization: OrganizationJSON,
): Promise<void> => {
  const organization = modelizer(clerkOrganization);
  await prisma.organization.create({ data: organization });
};

export const updateOrganization = async (
  clerkOrganization: OrganizationJSON,
): Promise<void> => {
  const organization = modelizer(clerkOrganization);
  if (organization.clerkId === null) {
    return;
  }
  await prisma.organization.update({
    where: { clerkId: organization.clerkId },
    data: { ...organization },
  });
};

export const deleteOrganization = async ({
  id,
}: DeletedObjectJSON): Promise<void> => {
  await prisma.organization.delete({ where: { clerkId: id } });
};
