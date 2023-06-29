import { DeletedObjectJSON, OrganizationJSON } from '@clerk/clerk-sdk-node';
import { Organization } from '@prisma/client';
import { prisma } from 'services/database/prisma';

const modelizer = (organization: OrganizationJSON): Partial<Organization> => {
  return {
    name: organization.name,
    clerk_id: organization.id,
    image: organization.image_url,
    slug: organization.slug,
  };
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
  if (organization.clerk_id === null) {
    return;
  }
  await prisma.organization.update({
    where: { clerk_id: organization.clerk_id },
    data: { ...organization },
  });
};

export const deleteOrganization = async ({
  id,
}: DeletedObjectJSON): Promise<void> => {
  await prisma.organization.delete({ where: { clerk_id: id } });
};
