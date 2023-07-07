import { DeletedObjectJSON, UserJSON } from '@clerk/clerk-sdk-node';
import { Organization, UserMembership } from '@prisma/client';
import { prisma } from 'services/database/prisma';

const modelizer = (user: UserJSON) => {
  const { primary_email_address_id } = user;
  const emailObject = user.email_addresses.find(
    emailAddress => emailAddress.id === primary_email_address_id,
  );
  if (!emailObject) {
    throw new Error('No email address found');
  }

  return {
    email: emailObject.email_address,
    firstName: user.first_name,
    lastName: user.last_name,
    clerkId: user.id,
    image: user.profile_image_url,
  };
};

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

export const syncClerkUser = async (clerkUser: UserJSON): Promise<void> => {
  const user = modelizer(clerkUser);
  const retrievedUser = await prisma.user.findUnique({
    where: { email: user.email },
  });
  if (retrievedUser === null) {
    await prisma.user.create({ data: user });

    return;
  }
  await prisma.user.update({
    where: { email: user.email },
    data: { clerkId: user.clerkId, image: user.image },
  });
};

export const updateUser = async (clerkUser: UserJSON): Promise<void> => {
  const user = modelizer(clerkUser);
  await prisma.user.update({
    where: { clerkId: user.clerkId },
    data: { ...user },
  });
};

export const deleteUser = async ({ id }: DeletedObjectJSON): Promise<void> => {
  await prisma.user.delete({ where: { clerkId: id } });
};
