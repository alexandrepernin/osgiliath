import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { User } from '@prisma/client';

interface Props {
  users: User[];
}

export const EmployeeListing = ({ users }: Props): JSX.Element => {
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
          {users.map(user => (
            <Tr key={user.email}>
              <Td>{`${user.firstName ?? ''} ${user.lastName ?? ''}`}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
