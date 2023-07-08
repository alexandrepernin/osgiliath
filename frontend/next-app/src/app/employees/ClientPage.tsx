'use client';

import { Box, Stack, useDisclosure } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { EmployeeListing } from 'components/EmployeeListing';
import { NewEmployeeModal } from 'components/NewEmployeeModal';
import { SidebarWithHeader } from 'components/Sidebar';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Employee } from 'types/Employee';

interface Props {
  employees: Employee[];
}

export const ClientPage = ({ employees }: Props): JSX.Element => {
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
