import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { SidebarWithHeader } from 'components/Sidebar';
import { EmployeeListing } from 'components/EmployeeListing';
import { Button, Stack } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { getAuth } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import { getOrganizationMembers } from 'services/database/organization';

export const getServerSideProps: GetServerSideProps<{
  users: User[];
}> = async ctx => {
  const { orgId } = getAuth(ctx.req);
  if (orgId === null || orgId === undefined) {
    return { props: { users: [] } };
  }
  const users = await getOrganizationMembers(orgId);

  return {
    props: { users },
  };
};

const Page = ({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  return (
    <SidebarWithHeader menuIndex={0}>
      <Stack direction="row" spacing={4} justify="flex-end" marginBottom="3">
        <Button leftIcon={<FiPlus />} colorScheme="teal" variant="outline">
          Employee
        </Button>
      </Stack>
      <EmployeeListing users={users} />
    </SidebarWithHeader>
  );
};

export default Page;
