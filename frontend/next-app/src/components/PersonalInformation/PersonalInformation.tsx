import {
  Box,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { Button } from '@mantine/core';
import { Modal } from 'components/Modal';

// to do: take the data from the database
export const PersonalInformation = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="white" rounded="md" padding="6">
        <HStack justify="space-between">
          <Heading size="md">Personal information</Heading>
          <Button variant="light" onClick={onOpen}>
            Edit
          </Button>
        </HStack>
        <TableContainer>
          <Table
            variant="simple"
            backgroundColor="white"
            borderRadius="lg"
            size="md"
          >
            <Tbody>
              <Tr>
                <Td>Name</Td>
                <Td>Alexandre Pernin</Td>
                {/* <Td>Needs editing</Td> */}
              </Tr>
              <Tr>
                <Td>Address</Td>
                <Td>7 Villa Saint Mandé</Td>
              </Tr>
              <Tr>
                <Td>Postal code</Td>
                <Td>75012</Td>
              </Tr>
              <Tr>
                <Td>City</Td>
                <Td>Paris</Td>
              </Tr>
              <Tr>
                <Td>Country</Td>
                <Td>France</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} header="Personal information">
        <>Empty for now</>
      </Modal>
    </>
  );
};
