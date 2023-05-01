import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
  url: string;
};

const hello = (_req: NextApiRequest, res: NextApiResponse<Data>): void => {
  res
    .status(200)
    .json({ name: 'John Doe', url: process.env.NEXT_PUBLIC_URL ?? '' });
};

export default hello;
