import { GetServerSideProps } from 'next';

import { Box, Stack, useDisclosure } from '@chakra-ui/react';
import { getAuth } from '@clerk/nextjs/server';
import { Button } from 'components/Button';
import { EmployeeListing } from 'components/EmployeeListing';
import { NewEmployeeModal } from 'components/NewEmployeeModal';
import { SidebarWithHeader } from 'components/Sidebar';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { getOrganizationEmployees } from 'backend/services/employee';
import { Employee } from 'types/Employee';

interface Props {
  employees: Employee[];
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { orgId } = getAuth(req);
  if (orgId === null || orgId === undefined) {
    return { props: { users: [] } };
  }
  const employees = await getOrganizationEmployees(orgId);

  return {
    props: { employees },
  };
};

const Page = ({ employees }: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SidebarWithHeader menuIndex={1}>
      <Box padding="4">
        <Stack direction="row" spacing={4} justify="flex-end" marginBottom="3">
          <Button
            onClick={onOpen}
            leftIcon={<BsFillPlusCircleFill />}
            text="Employee"
          />
        </Stack>
        <EmployeeListing employees={employees} />
        <NewEmployeeModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </SidebarWithHeader>
  );
};

export default Page;