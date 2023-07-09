'use client';

import { Box, HStack, useDisclosure } from '@chakra-ui/react';
import { Button } from 'components/Button';
import { EmployeeTable } from 'components/EmployeeTable';
import { NewEmployeeModal } from 'components/NewEmployeeModal';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Employee } from 'types/Employee';

interface Props {
  employees: Employee[];
}

export const EmployeeListingPage = ({ employees }: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box padding="4">
      <HStack spacing={4} justify="flex-end" marginBottom="3">
        <Button
          onClick={onOpen}
          leftIcon={<BsFillPlusCircleFill />}
          text="Employee"
        />
      </HStack>
      <EmployeeTable employees={employees} />
      <NewEmployeeModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};