/* eslint-disable complexity */
import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import { NextApiRequest, NextApiResponse } from 'next';
import sendStatus from 'utils/status';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { buffer } from 'micro';
import { createUser, deleteUser, updateUser } from 'services/database/user';
import {
  createOrganization,
  deleteOrganization,
  updateOrganization,
} from 'services/database/organization';
import {
  createOrganizationMembership,
  deleteOrganizationMembership,
  updateOrganizationMembership,
} from 'services/database/organizationMembership';

enum CLERK_EVENTS {
  USER_CREATED = 'user.created',
  USER_UPDATED = 'user.updated',
  USER_DELETED = 'user.deleted',
  ORGANIZATION_CREATED = 'organization.created',
  ORGANIZATION_UPDATED = 'organization.updated',
  ORGANIZATION_DELETED = 'organization.deleted',
  ORGANIZATION_MEMBERSHIP_CREATED = 'organizationMembership.created',
  ORGANIZATION_MEMBERSHIP_UPDATED = 'organizationMembership.updated',
  ORGANIZATION_MEMBERSHIP_DELETED = 'organizationMembership.deleted',
  ORGANIZATION_INVITATION_CREATED = 'organizationInvitation.created',
  ORGANIZATION_INVITATION_ACCEPTED = 'organizationInvitation.accepted',
  ORGANIZATION_INVITATION_REVOKED = 'organizationInvitation.revoked',
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const secret = process.env.CLERK_WEBHOOK_SECRET as string;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method !== 'POST') {
    sendStatus(res, 405);

    return;
  }

  const payload = (await buffer(req)).toString();
  const headers = req.headers as unknown as WebhookRequiredHeaders;

  const wh = new Webhook(secret);
  let message;
  try {
    message = wh.verify(payload, headers);
  } catch (err) {
    sendStatus(res, 500);
  }

  if (!isClerkAPIPostData(message)) {
    sendStatus(res, 400);

    return;
  }

  switch (message.type) {
    case CLERK_EVENTS.USER_CREATED:
      await createUser(message.data);
      break;
    case CLERK_EVENTS.USER_UPDATED:
      await updateUser(message.data);
      break;
    case CLERK_EVENTS.USER_DELETED:
      await deleteUser(message.data);
      break;

    case CLERK_EVENTS.ORGANIZATION_CREATED:
      await createOrganization(message.data);
      break;
    case CLERK_EVENTS.ORGANIZATION_UPDATED:
      await updateOrganization(message.data);
      break;
    case CLERK_EVENTS.ORGANIZATION_DELETED:
      await deleteOrganization(message.data);
      break;

    case CLERK_EVENTS.ORGANIZATION_MEMBERSHIP_CREATED:
      await createOrganizationMembership(message.data);
      break;
    case CLERK_EVENTS.ORGANIZATION_MEMBERSHIP_UPDATED:
      await updateOrganizationMembership(message.data);
      break;
    case CLERK_EVENTS.ORGANIZATION_MEMBERSHIP_DELETED:
      await deleteOrganizationMembership(message.data);
      break;

    default:
      sendStatus(res, 400);
  }

  sendStatus(res, 200);
};

export default handler;

export type ClerkAPIPostData = {
  evt: WebhookEvent;
};

const isClerkAPIPostData = (message: unknown): message is WebhookEvent =>
  message !== null && typeof message === 'object' && 'data' in message;
