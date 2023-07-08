import {
  Avatar,
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Employee, User } from '@prisma/client';
import NextLink from 'next/link';

interface Props {
  employees: (User & {
    employee: Employee;
  })[];
}

export const EmployeeListing = ({ employees }: Props): JSX.Element => {
  return (
    <TableContainer>
      <Table variant="simple" backgroundColor="white" borderRadius="lg">
        <Thead>
          <Tr>
            <Th>Employee</Th>
            <Th>Position</Th>
            <Th>Start date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map(({ employee, image }) => (
            <LinkBox
              key={employee.id}
              as={Tr}
              _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
            >
              <Td>
                <LinkOverlay
                  as={NextLink}
                  key={employee.id}
                  href={`/employees/${employee.id}`}
                >
                  <Flex align="baseline">
                    <Avatar
                      size="sm"
                      backgroundColor="brand.avatar.background"
                      color="brand.avatar.textColor"
                      name={`${employee.firstName ?? ''} ${
                        employee.lastName ?? ''
                      }`}
                      src={image ?? undefined}
                      marginRight="2"
                    />
                    <Box>{`${employee.firstName ?? ''} ${
                      employee.lastName ?? ''
                    }`}</Box>
                  </Flex>
                </LinkOverlay>
              </Td>
              <Td>{employee.jobTitle}</Td>
              <Td>
                {employee.startDate
                  ? new Date(employee.startDate).toLocaleDateString()
                  : ''}
              </Td>
            </LinkBox>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
