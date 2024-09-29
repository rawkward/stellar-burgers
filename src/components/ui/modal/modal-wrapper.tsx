import { useParams, useNavigate } from 'react-router-dom';
import { Modal } from 'src/components/modal';

function ModalWrapper() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const onClose = () => navigate(-1);

  if (id === undefined) {
    navigate('/');
    return null;
  }

  return <Modal title={id} onClose={onClose} />;
}

export default ModalWrapper;
