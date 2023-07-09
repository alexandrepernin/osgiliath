import { Modal } from 'components/Modal';
import { NewLeaveForm } from './NewLeaveForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewLeaveModal = ({ isOpen, onClose }: Props): JSX.Element => (
  <Modal isOpen={isOpen} onClose={onClose} header="New leave request">
    <NewLeaveForm />
  </Modal>
);
