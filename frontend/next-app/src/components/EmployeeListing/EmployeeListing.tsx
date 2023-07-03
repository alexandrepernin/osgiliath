import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Employee } from '@prisma/client';

interface Props {
  employees: Employee[];
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
          {employees.map(employee => (
            <Tr key={employee.id}>
              <Td>{`${employee.firstName ?? ''} ${
                employee.lastName ?? ''
              }`}</Td>
              <Td>{employee.jobTitle}</Td>
              <Td>
                {employee.startDate
                  ? new Date(employee.startDate).toDateString()
                  : ''}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
