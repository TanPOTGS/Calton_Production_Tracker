import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  deleteOrder
} from '../../features/orders/orderSlice'
import {
  MdDelete
} from 'react-icons/md'
import styled from 'styled-components';

function DeleteMessage(props) {
  const {
    orderDataForModal,
    closeModal,
    clearSidebarState
  } = props

  const dispatch = useDispatch();

  const {
    isSuccess
  } = useSelector((state) => state.orders)

  const handleDelete = () => {
    dispatch(deleteOrder(orderDataForModal._id))

    if(isSuccess) {
      closeModal()
      clearSidebarState()
    }
  }

  return (
    <StyledDeleteMessageContainer>
      <StyledDeleteHeader>
        <h1>
          <MdDelete /> Delete
        </h1>
      </StyledDeleteHeader>
      <StyledDeleteMessage>
        <h3>Are you sure you want to delete order {orderDataForModal.wcNumber}?</h3>
      </StyledDeleteMessage>
      <StyledButtonContainer>
        <StyledSubmitButton onClick={handleDelete}>
          Delete
        </StyledSubmitButton>
        <StyledCancelButton onClick={closeModal}>
          Cancel
        </StyledCancelButton>
      </StyledButtonContainer>
    </StyledDeleteMessageContainer>
  )
}

export default DeleteMessage

const StyledDeleteMessageContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  position: absolute;
  width: 30vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledDeleteHeader = styled.div`
  color: #000000;
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #009879;
`

const StyledDeleteMessage = styled.div`
  padding: 0 40px;
  margin: 20px 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
`

const StyledButtonContainer = styled.div`
  display: flex;
  margin: 20px 0;
  padding: 0 20%;
`

const StyledSubmitButton = styled.button`
  margin: 0 10px;
  width: 100%;
  height: 50px;
  border: 1px solid #ffffff;
  background: #009879;
  border-radius: 25px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  &:hover {
    border-color: #009879;
    transition: .4s;
  }
`

const StyledCancelButton = styled.button`
  margin: 0 10px;
  width: 100%;
  height: 50px;
  border: 1px solid #ffffff;
  background: #000000;
  border-radius: 25px;
  font-size: 18px;
  color: #009879;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  &:hover {
    border-color: #000000;
    transition: .4s;
  }
`