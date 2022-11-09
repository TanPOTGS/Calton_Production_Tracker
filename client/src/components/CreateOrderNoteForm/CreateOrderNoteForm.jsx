import {
  useState
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  updateOrder
} from '../../features/orders/orderSlice';
import { RiAddFill } from 'react-icons/ri'
import styled from 'styled-components';

function CreateOrderNoteForm(props) {
  const {
    closeModal,
    orderDataForModal
  } = props

  const [formData, setFormData] = useState({
    _id: orderDataForModal._id,
    orderNote: ''
  })
  
  const {
    _id,
    orderNote
  } = formData

  const dispatch = useDispatch()

  const {
    isSuccess
  } = useSelector((state) => state.orders)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    // console.log(`Name: ${e.target.name} | Value: ${e.target.value}`)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const orderData = {
      _id,
      orderNote
    }

    dispatch(updateOrder(orderData))

    setFormData({
      orderNote: '',
    })

    if(isSuccess) {
      closeModal()
    }
  }
  
  return (
    <StyledFormContainer>
      <StyledFormHeader>
        <h1>
          <RiAddFill />
          Notes About Build
        </h1>
      </StyledFormHeader>
      <StyledForm onSubmit={onSubmit}>
        <StyledFormGroup>
          <StyledTextInput 
            type="text" 
            name='orderNote'
            id='orderNote'
            rows="30"
            cols="30"
            value={orderNote}
            onChange={onChange}
            // required
          />
          {/* <StyledFormSpan></StyledFormSpan> */}
          <StyledFormLabel htmlFor="orderNote">Order Note</StyledFormLabel>
        </StyledFormGroup>
        <StyledFormButtonContainer>
          <StyledSubmitButton type='submit'>
            Add Note
          </StyledSubmitButton>
          <StyledCancelButton onClick={closeModal}>
            Cancel
          </StyledCancelButton>
        </StyledFormButtonContainer>
      </StyledForm>
    </StyledFormContainer>
  )
}

export default CreateOrderNoteForm

const StyledFormContainer = styled.section`
  background-color: #ffffff;
  border-radius: 10px;
  position: absolute;
  width: 50vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledFormHeader = styled.div`
  display: flex;
  color: #000000;
  justify-content: center;
  padding: 20px 0;
  border-bottom: 1px solid #009879;
`

const StyledForm = styled.form`
  padding: 0 40px;
  box-sizing: border-box;
`

const StyledFormGroup = styled.div`
  position: relative;
  border-bottom: 2px solid #afafaf;
  margin 30px 0;
`

const StyledTextInput = styled.textarea`
  color: #000000;
  width: 100%;
  padding: 20px 5px 0 5px;
  height: 100px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
  // &:focus ~ label {
  //   top: -5px;
  //   color: #009879;
  // }
  &:valid ~ label {
    top: -5px;
    color: #009879;
  }
  // &:focus ~ span:before {
  //   width: 100%;
  // }
`

const StyledFormSpan = styled.span`
  &:before {
    content: '';
    position: absolute;
    top: 40px;
    left: 0;
    width: 0%;
    height: 2px;
    background: #009879;
    transition: .4s;
  }
`

const StyledFormLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 5px;
  color: #000000;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: .4s;
`

const StyledFormButtonContainer = styled.div`
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