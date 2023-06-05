import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { sendForgotPassword } from 'services/emails/sendForgotPassword';
import { prisma } from 'services/database/prisma';
import { setTimeout } from 'timers/promises';

import sendStatus from 'utils/status';

export type ForgotPasswordAPIPostData = {
  email: string;
};

const isForgotPasswordAPIPostData = (
  data: unknown,
): data is ForgotPasswordAPIPostData =>
  data !== null && typeof data === 'object' && 'email' in data;

const handleError = (error: unknown, res: NextApiResponse<string>) => {
  res.setHeader('Content-Type', 'text/plain');
  res
    .status(500)
    .send(error instanceof Error ? error.message : (error as string));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    sendStatus(res, 405);

    return;
  }

  if (!isForgotPasswordAPIPostData(req.body)) {
    sendStatus(res, 400);

    return;
  }

  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user === null) {
    await setTimeout(1000);
    sendStatus(res, 200);

    return;
  }

  const jwtPayload = {
    email,
  };
  const secretKey = process.env.NEXTAUTH_SECRET ?? '';
  const token = jwt.sign(jwtPayload, secretKey, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });

  try {
    await sendForgotPassword(email, token);
    res.status(200).json('successfully sent');
  } catch (error) {
    handleError(error, res);
  }
};

export default handler;
