import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Stack, useDisclosure } from '@chakra-ui/react';
import { getAuth } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import { Button } from 'components/Button';
import { EmployeeListing } from 'components/EmployeeListing';
import { NewEmployeeModal } from 'components/NewEmployeeModal';
import { SidebarWithHeader } from 'components/Sidebar';
import { BsFillPlusCircleFill } from 'react-icons/bs';
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SidebarWithHeader menuIndex={0}>
      <Stack direction="row" spacing={4} justify="flex-end" marginBottom="3">
        <Button
          onClick={onOpen}
          leftIcon={<BsFillPlusCircleFill />}
          text="Employee"
        />
      </Stack>
      <EmployeeListing users={users} />
      <NewEmployeeModal isOpen={isOpen} onClose={onClose} />
    </SidebarWithHeader>
  );
};

export default Page;
