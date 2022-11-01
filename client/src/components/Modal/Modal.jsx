import CreateOrderForm from '../CreateOrderForm/CreateOrderForm';
import DeleteMessage from '../DeleteMessage/DeleteMessage';
import UpdateOrderForm from '../UpdateOrderForm/UpdateOrderForm';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import UpdateContactsForm from '../UpdateContactsForm/UpdateContactsForm';
import styled from 'styled-components';

function Modal(modalProps) {
  const {
    closeModal,
    modalType,
    orderDataForModal
  } = modalProps

  const renderModal = () => {
    switch (modalType) {
      case 'createOrderForm':
        return <CreateOrderForm 
          closeModal={closeModal}
        />
      case 'deleteOrderForm':
        return <DeleteMessage
            closeModal={closeModal}
            orderDataForModal={orderDataForModal}
          />
      case 'editOrderForm':
        return <UpdateOrderForm
            closeModal={closeModal}
            orderDataForModal={orderDataForModal}
          />
      case 'editContactsForm':
        return <UpdateContactsForm
          closeModal={closeModal}
          orderDataForModal={orderDataForModal}
        />
      case 'addCommentForm':
        return <AddCommentForm
          closeModal={closeModal}
          orderDataForModal={orderDataForModal}
        />
      default:
        console.log('default');
    }
  }

  return (
    <StyledModalBackground>
      <div>
        {renderModal()}
      </div>
    </StyledModalBackground>
  )
}

export default Modal

const StyledModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(200, 200, 200, .7);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`
