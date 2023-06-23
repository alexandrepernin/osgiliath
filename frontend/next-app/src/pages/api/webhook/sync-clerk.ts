import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import { NextApiRequest, NextApiResponse } from 'next';
import sendStatus from 'utils/status';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { buffer } from 'micro';

enum CLERK_EVENTS {
  USER_CREATED = 'user.created',
  ORGANIZATION_INVITATION_CREATED = 'organizationInvitation.created',
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
      console.log('WEBHOOK', `${message.data.first_name}`);
      break;
    case CLERK_EVENTS.ORGANIZATION_INVITATION_CREATED:
      console.log('WEBHOOK', `${message.data.email_address}`);
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
