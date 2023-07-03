import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { createEmployee } from 'services/database/employee';
import sendStatus from 'utils/status';
import { getUserOrganizationByClerkId } from 'services/database/user';
import { Role } from '@prisma/client';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  if (req.method !== 'POST') {
    sendStatus(res, 405);

    return;
  }

  if (!isCreateEmployeeAPIPostData(req.body)) {
    sendStatus(res, 400);

    return;
  }

  const { orgId: clerkOrgId, userId: userClerkId, orgRole } = getAuth(req);
  if (userClerkId === null || orgRole !== 'admin' || clerkOrgId === undefined) {
    sendStatus(res, 403);

    return;
  }

  const callerOrganization = await getUserOrganizationByClerkId(
    userClerkId,
    clerkOrgId,
  );

  if (callerOrganization === null) {
    sendStatus(res, 403);

    return;
  }

  // to do: use start date as well
  const { email, firstName, lastName, jobTitle } = req.body;

  try {
    const createdEmployeee = await createEmployee(
      {
        email,
        firstName,
        lastName,
        jobTitle,
      },
      callerOrganization.organization.id,
      // to do: add possibility to choose role
      Role.basic_member,
    );
    res.status(200).json(createdEmployeee);
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

export type CreateEmployeeAPIPostData = {
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  startDate?: string;
};

const isCreateEmployeeAPIPostData = (
  data: unknown,
): data is CreateEmployeeAPIPostData =>
  data !== null &&
  typeof data === 'object' &&
  'email' in data &&
  'firstName' in data &&
  'lastName' in data &&
  'jobTitle' in data;
