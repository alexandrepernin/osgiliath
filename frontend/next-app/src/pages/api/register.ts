import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'services/database/prisma';
import sendStatus from 'utils/status';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    sendStatus(res, 405);

    return;
  }

  if (!isSignUpAPIPostData(req.body)) {
    sendStatus(res, 400);

    return;
  }

  const { email, password } = req.body;
  const hashed_password = await hash(password, 12);

  try {
    await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });
    res.status(200).json({
      user: {
        email,
      },
    });
  } catch (error) {
    handleError(error, res);
  }
};

export default handler;

const handleError = (error: unknown, res: NextApiResponse<string>) => {
  res.setHeader('Content-Type', 'text/plain');
  res
    .status(500)
    .send(error instanceof Error ? error.message : (error as string));
};

export type SignUpAPIPostData = {
  email: string;
  password: string;
};

const isSignUpAPIPostData = (data: unknown): data is SignUpAPIPostData =>
  data !== null &&
  typeof data === 'object' &&
  'email' in data &&
  'password' in data;
