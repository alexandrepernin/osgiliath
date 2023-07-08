import { handler } from 'backend/controllers/sync-clerk';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
