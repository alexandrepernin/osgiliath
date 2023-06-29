import { DeletedObjectJSON, UserJSON } from '@clerk/clerk-sdk-node';
import { User } from '@prisma/client';
import { prisma } from 'services/database/prisma';

const modelizer = (user: UserJSON): Partial<User> => {
  const { primary_email_address_id } = user;
  const emailObject = user.email_addresses.find(
    emailAddress => emailAddress.id === primary_email_address_id,
  );
  if (!emailObject) {
    throw new Error('No email address found');
  }

  return {
    email: emailObject.email_address,
    first_name: user.first_name,
    last_name: user.last_name,
    clerk_id: user.id,
    image: user.profile_image_url,
  };
};

export const createUser = async (clerkUser: UserJSON): Promise<void> => {
  const user = modelizer(clerkUser);
  await prisma.user.create({ data: user });
};

export const updateUser = async (clerkUser: UserJSON): Promise<void> => {
  const user = modelizer(clerkUser);
  if (user.clerk_id === null) {
    return;
  }
  await prisma.user.update({
    where: { clerk_id: user.clerk_id },
    data: { ...user },
  });
};

export const deleteUser = async ({ id }: DeletedObjectJSON): Promise<void> => {
  await prisma.user.delete({ where: { clerk_id: id } });
};
