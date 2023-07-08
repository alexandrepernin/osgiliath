import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  header?: string;
  children: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  header,
  children,
}: Props): JSX.Element => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header ?? ''}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="6">{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};
