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
import { MdOutlineEdit } from 'react-icons/md'
import styled from 'styled-components';

function AddCommentForm(props) {
  const {
    closeModal,
    orderDataForModal
  } = props

  const convertDate = (date) => {
    const convertedDate = new Date(date).toISOString().slice(0,10);

    return convertedDate
  }

  let convertedSubmitDate = convertDate(orderDataForModal.submitDate)
  let convertedReviewDate = convertDate(orderDataForModal.reviewDate)
  let convertedEligibleForProductionDate = convertDate(orderDataForModal.eligibleForProductionDate)

  const [formData, setFormData] = useState({
    _id: orderDataForModal._id,
    reviewStatus: orderDataForModal.reviewStatus,
    submitDate: convertedSubmitDate,
    reviewDate: convertedReviewDate,
    eligibleForProductionDate: convertedEligibleForProductionDate,
    wcNumber: orderDataForModal.wcNumber,
    modelCode: orderDataForModal.modelCode,
    customer: orderDataForModal.customer,
    caltonRep: orderDataForModal.caltonRep
  })
  
  const {
    _id,
    reviewStatus,
    submitDate,
    reviewDate,
    eligibleForProductionDate,
    wcNumber,
    modelCode,
    customer,
    caltonRep
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

    const newOrderData = {
      _id,
      reviewStatus,
      submitDate,
      reviewDate,
      eligibleForProductionDate,
      wcNumber,
      modelCode,
      customer,
      caltonRep
    }

    dispatch(updateOrder(newOrderData))

    if(isSuccess) {
      closeModal()
    }
  }
  
  return (
    <StyledFormContainer>
      <StyledFormHeader>
        <h1>
          <MdOutlineEdit /> Edit Order
        </h1>
      </StyledFormHeader>
      <StyledForm onSubmit={onSubmit}>
        <StyledOuterInputContainer>
          <StyledInnerInputContainer>
            <StyledFormSelectGroup>
              <StyledSelect
                name='reviewStatus'
                id='reviewStatus'
                required
                onChange={onChange}
                defaultValue={reviewStatus}
              >
                <StyledSelectOption value=""></StyledSelectOption>
                <StyledSelectOption value="Hold">Hold</StyledSelectOption>
                <StyledSelectOption value="Pending">Pending</StyledSelectOption>
                <StyledSelectOption value="Ready">Ready</StyledSelectOption>
              </StyledSelect>
              <StyledFormSpan></StyledFormSpan>
              <StyledSelectLabel htmlFor="reviewStatus">Review Status</StyledSelectLabel>
            </StyledFormSelectGroup>
            <StyledFormGroup>
              <StyledDateInput 
                type="date" 
                name='submitDate'
                id='submitDate'
                value={submitDate}
                onChange={onChange}
                required
              />
              <StyledFormSpan></StyledFormSpan>
              <StyledDateLabel htmlFor="submitDate">Submit Date</StyledDateLabel>
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledDateInput 
                type="date" 
                name='reviewDate'
                id='reviewDate'
                value={reviewDate}
                onChange={onChange}
                required
              />
              <StyledFormSpan></StyledFormSpan>
              <StyledDateLabel htmlFor="reviewDate">Review Date</StyledDateLabel>
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledDateInput 
                type="date" 
                name='eligibleForProductionDate'
                id='eligibleForProductionDate'
                value={eligibleForProductionDate}
                onChange={onChange}
                required
              />
              <StyledFormSpan></StyledFormSpan>
              <StyledDateLabel htmlFor="eligibleForProductionDate">Eligible For Production Date</StyledDateLabel>
            </StyledFormGroup>
          </StyledInnerInputContainer>
          <StyledInnerInputContainer>
            <StyledFormGroup>
              <StyledTextInput 
                type="text" 
                name='wcNumber'
                id='wcNumber'
                value={wcNumber}
                onChange={onChange}
                required
              />
              <StyledFormSpan></StyledFormSpan>
              <StyledFormLabel htmlFor="wcNumber">WC Number</StyledFormLabel>
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledTextInput 
                type="text" 
                name='modelCode'
                id='modelCode'
                value={modelCode}
                onChange={onChange}
                required
              />
              <StyledFormSpan></StyledFormSpan>
              <StyledFormLabel htmlFor="modelCode">Model Code</StyledFormLabel>
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledTextInput 
                type="text" 
                name='customer'
                id='customer'
                value={customer}
                onChange={onChange}
                required
              />
              <StyledFormSpan></StyledFormSpan>
              <StyledFormLabel htmlFor="customer">Customer</StyledFormLabel>
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledTextInput 
                type="text" 
                name='caltonRep'
                id='caltonRep'
                value={caltonRep}
                onChange={onChange}
                required
              />
              <StyledFormSpan></StyledFormSpan>
              <StyledFormLabel htmlFor="caltonRep">Calton Rep</StyledFormLabel>
            </StyledFormGroup>
          </StyledInnerInputContainer>
        </StyledOuterInputContainer>
        <StyledFormButtonContainer>
          <StyledSubmitButton type='submit'>
            Submit
          </StyledSubmitButton>
          <StyledCancelButton onClick={closeModal}>
            Cancel
          </StyledCancelButton>
        </StyledFormButtonContainer>
      </StyledForm>
    </StyledFormContainer>
  )
}

export default AddCommentForm

const StyledFormContainer = styled.section`
  background-color: #ffffff;
  border-radius: 10px;
  position: absolute;
  width: 50vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledOuterInputContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
`

const StyledInnerInputContainer = styled.div`
  width: 100%;
  padding: 0 10px;
`

const StyledFormHeader = styled.div`
  color: #000000;
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #009879;
`

const StyledForm = styled.form`
  padding: 0 40px;
  box-sizing: border-box;
`

const StyledFormSelectGroup = styled.div`
  position: relative;
  border-bottom: 2px solid #afafaf;
  margin 30px 0;
`

const StyledSelect = styled.select`
  color: #000000;
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
  &:focus ~ label {
    top: -5px;
    color: #009879;
  }
  &:valid ~ label {
    top: -5px;
    color: #009879;
  }
  &:focus ~ span:before {
    width: 100%;
  }
`

const StyledSelectOption = styled.option`
  background-color: #ffffff;
`

const StyledSelectLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 5px;
  color: #000000;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: .4s;
`

const StyledFormGroup = styled.div`
  position: relative;
  border-bottom: 2px solid #afafaf;
  margin 30px 0;
`

const StyledTextInput = styled.input`
  color: #000000;
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
  &:focus ~ label {
    top: -5px;
    color: #009879;
  }
  &:valid ~ label {
    top: -5px;
    color: #009879;
  }
  &:focus ~ span:before {
    width: 100%;
  }
`

const StyledDateInput = styled.input`
  color: #000000;
  padding: 10px 5px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
  &::-webkit-calendar-picker-indicator {
    background-color: #009879;
  }
  &:focus ~ label {
    color: #009879;
  }
  &:valid ~ label {
    color: #009879;
  }
  &:focus ~ span:before {
    width: 100%;
  }
`

const StyledDateLabel = styled.label`
  position: absolute;
  top: -5px;
  left: 5px;
  color: #000000;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: .4s;
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