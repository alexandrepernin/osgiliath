import { NextApiResponse } from 'next';

export const STATUS = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  304: 'Not modified',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  423: 'Locked',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
};

const sendStatus = (
  res: NextApiResponse,
  status: keyof typeof STATUS,
): void => {
  res.setHeader('Content-Type', 'text/plain');
  if (![204, 304].includes(status)) {
    res.status(status).send(`${status} ${STATUS[status]}`);
  } else {
    res.end();
  }
};

export default sendStatus;
