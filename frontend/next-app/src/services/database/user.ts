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
    firstName: user.first_name,
    lastName: user.last_name,
    clerkId: user.id,
    image: user.profile_image_url,
  };
};

export const createUser = async (clerkUser: UserJSON): Promise<void> => {
  const user = modelizer(clerkUser);
  await prisma.user.create({ data: user });
};

export const updateUser = async (clerkUser: UserJSON): Promise<void> => {
  const user = modelizer(clerkUser);
  if (user.clerkId === null) {
    return;
  }
  await prisma.user.update({
    where: { clerkId: user.clerkId },
    data: { ...user },
  });
};

export const deleteUser = async ({ id }: DeletedObjectJSON): Promise<void> => {
  await prisma.user.delete({ where: { clerkId: id } });
};
