import { DeletedObjectJSON, UserJSON } from '@clerk/clerk-sdk-node';
import { prisma } from '../prisma';

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

export const syncUserCreation = async (clerkUser: UserJSON): Promise<void> => {
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

export const syncUserUpdate = async (clerkUser: UserJSON): Promise<void> => {
  const user = modelizer(clerkUser);
  await prisma.user.update({
    where: { clerkId: user.clerkId },
    data: { ...user },
  });
};

export const syncUserDeletion = async ({
  id,
}: DeletedObjectJSON): Promise<void> => {
  await prisma.user.delete({ where: { clerkId: id } });
};
