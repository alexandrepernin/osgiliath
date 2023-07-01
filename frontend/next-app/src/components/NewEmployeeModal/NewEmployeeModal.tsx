import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Button } from 'components/Button';

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
        <ModalBody />
        <ModalFooter>
          <Button onClick={onClose} text="Confirm" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
