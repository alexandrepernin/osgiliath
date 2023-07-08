import { DeletedObjectJSON, OrganizationJSON } from '@clerk/clerk-sdk-node';
import { prisma } from '../prisma';

const clerkOrganizationToOrganization = (organization: OrganizationJSON) => {
  return {
    name: organization.name,
    clerkId: organization.id,
    image: organization.image_url,
    slug: organization.slug,
  };
};

export const syncOrganizationCreation = async (
  clerkOrganization: OrganizationJSON,
): Promise<void> => {
  const organization = clerkOrganizationToOrganization(clerkOrganization);
  await prisma.organization.create({ data: organization });
};

export const syncOrganizationUpdate = async (
  clerkOrganization: OrganizationJSON,
): Promise<void> => {
  const organization = clerkOrganizationToOrganization(clerkOrganization);
  await prisma.organization.update({
    where: { clerkId: organization.clerkId },
    data: { ...organization },
  });
};

export const syncOrganizationDeletion = async ({
  id,
}: DeletedObjectJSON): Promise<void> => {
  await prisma.organization.delete({ where: { clerkId: id } });
};
