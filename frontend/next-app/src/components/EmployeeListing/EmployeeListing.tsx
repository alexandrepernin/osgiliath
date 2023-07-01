import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export const EmployeeListing = (): JSX.Element => {
  const employees = [
    { fullName: 'Alexandre Pernin', position: 'CTO', startDate: '2021-01-01' },
    { fullName: 'Maxence Drummond', position: 'CEO', startDate: '2021-01-01' },
  ];

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
            <Tr key={employee.fullName}>
              <Td>{employee.fullName}</Td>
              <Td>{employee.position}</Td>
              <Td>{employee.startDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
