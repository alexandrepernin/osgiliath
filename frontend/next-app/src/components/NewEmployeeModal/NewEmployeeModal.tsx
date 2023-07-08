import { Modal } from 'components/Modal';
import { NewEmployeeForm } from './NewEmployeeForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewEmployeeModal = ({ isOpen, onClose }: Props): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Add employee">
      <NewEmployeeForm />
    </Modal>
  );
};
