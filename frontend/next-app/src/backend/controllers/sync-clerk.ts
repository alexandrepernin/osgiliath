/* eslint-disable complexity */
import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import { NextApiRequest, NextApiResponse } from 'next';
import sendStatus from 'utils/status';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { buffer } from 'micro';
import {
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdate,
} from 'backend/services/clerk/syncUser';
import {
  syncOrganizationCreation,
  syncOrganizationDeletion,
  syncOrganizationUpdate,
} from 'backend/services/clerk/syncOrganization';
import {
  syncMembershipCreation,
  syncMembershipDeletion,
  syncMembershipUpdate,
} from 'backend/services/clerk/syncMembership';
import { CLERK_EVENTS } from 'backend/services/clerk/clerkEvents';

const secret = process.env.CLERK_WEBHOOK_SECRET as string;

export const handler = async (
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
      await syncUserCreation(message.data);
      break;
    case CLERK_EVENTS.USER_UPDATED:
      await syncUserUpdate(message.data);
      break;
    case CLERK_EVENTS.USER_DELETED:
      await syncUserDeletion(message.data);
      break;

    case CLERK_EVENTS.ORGANIZATION_CREATED:
      await syncOrganizationCreation(message.data);
      break;
    case CLERK_EVENTS.ORGANIZATION_UPDATED:
      await syncOrganizationUpdate(message.data);
      break;
    case CLERK_EVENTS.ORGANIZATION_DELETED:
      await syncOrganizationDeletion(message.data);
      break;

    case CLERK_EVENTS.ORGANIZATION_MEMBERSHIP_CREATED:
      await syncMembershipCreation(message.data);
      break;
    case CLERK_EVENTS.ORGANIZATION_MEMBERSHIP_UPDATED:
      await syncMembershipUpdate(message.data);
      break;
    case CLERK_EVENTS.ORGANIZATION_MEMBERSHIP_DELETED:
      await syncMembershipDeletion(message.data);
      break;

    default:
      sendStatus(res, 400);
  }

  sendStatus(res, 200);
};

export type ClerkAPIPostData = {
  evt: WebhookEvent;
};

const isClerkAPIPostData = (message: unknown): message is WebhookEvent =>
  message !== null && typeof message === 'object' && 'data' in message;
