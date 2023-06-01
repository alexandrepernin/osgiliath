import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import sendStatus from 'utils/status';
import { prisma } from 'services/database/prisma';
import { hash } from 'bcryptjs';

export type ResetPasswordAPIPostData = {
  password: string;
  token: string;
};

const isResetPasswordAPIPostData = (
  data: unknown,
): data is ResetPasswordAPIPostData =>
  data !== null &&
  typeof data === 'object' &&
  'token' in data &&
  'password' in data;

const handleError = (error: unknown, res: NextApiResponse<string>) => {
  res.setHeader('Content-Type', 'text/plain');
  res
    .status(500)
    .send(error instanceof Error ? error.message : (error as string));
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method !== 'POST') {
    sendStatus(res, 405);

    return;
  }

  if (!isResetPasswordAPIPostData(req.body)) {
    sendStatus(res, 400);

    return;
  }

  const { password, token } = req.body;

  const secretKey = process.env.NEXTAUTH_SECRET ?? '';
  let email;
  try {
    const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
    email = (decoded as { email: string }).email;
  } catch (error) {
    handleError(error, res);
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user === null) {
      sendStatus(res, 400);

      return;
    }
    const hashed_password = await hash(password, 12);
    await prisma.user.update({
      where: { email },
      data: { password: hashed_password },
    });
    res.status(200).json('successfully updated password');
  } catch (error) {
    handleError(error, res);
  }
};

export default handler;
