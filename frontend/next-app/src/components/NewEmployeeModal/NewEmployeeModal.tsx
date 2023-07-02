import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { NewEmployeeForm } from './NewEmployeeForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewEmployeeModal = ({ isOpen, onClose }: Props): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add employee</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="6">
          <NewEmployeeForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
