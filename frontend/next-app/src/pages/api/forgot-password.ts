import { NextApiRequest, NextApiResponse } from 'next';
import { sendForgotPassword } from 'services/emails/sendForgotPassword';

import sendStatus from 'utils/status';

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
  const token = 'toto';

  try {
    await sendForgotPassword(email, token);
    res.status(200).json('successfully sent');
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

export type ForgotPasswordAPIPostData = {
  email: string;
};

const isForgotPasswordAPIPostData = (
  data: unknown,
): data is ForgotPasswordAPIPostData =>
  data !== null && typeof data === 'object' && 'email' in data;