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
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight
} from 'react-icons/ai'
import styled from 'styled-components';

function UpdateContactsForm(props) {
  const {
    closeModal,
    orderDataForModal
  } = props

  const [formPageData, setFormPageData] = useState({
    page: 1,
    leftArrowDisabled: true,
    rightArrowDisabled: false
  })

  const {
    page,
    leftArrowDisabled,
    rightArrowDisabled
  } = formPageData

  const [formData, setFormData] = useState({
    _id: orderDataForModal._id,
    billingFirstName: orderDataForModal.billing.firstName,
    billingLastName: orderDataForModal.billing.lastName,
    billingCompany: orderDataForModal.billing.company,
    billingAddress: orderDataForModal.billing.address,
    billingCity: orderDataForModal.billing.city,
    billingPostcode: orderDataForModal.billing.postcode,
    billingCountry: orderDataForModal.billing.country,
    billingState: orderDataForModal.billing.state,
    billingEmail: orderDataForModal.billing.email,
    billingPhone: orderDataForModal.billing.phone,
    shippingFirstName: orderDataForModal.shipping.firstName,
    shippingLastName: orderDataForModal.shipping.lastName,
    shippingCompany: orderDataForModal.shipping.company,
    shippingAddress: orderDataForModal.shipping.address,
    shippingCity: orderDataForModal.shipping.city,
    shippingPostcode: orderDataForModal.shipping.postcode,
    shippingCountry: orderDataForModal.shipping.country,
    shippingState: orderDataForModal.shipping.state,
    shippingEmail: orderDataForModal.shipping.email,
    shippingPhone: orderDataForModal.shipping.phone
  })
  
  const {
    _id,
    billingFirstName,
    billingLastName,
    billingCompany,
    billingAddress,
    billingCity,
    billingPostcode,
    billingCountry,
    billingState,
    billingEmail,
    billingPhone,
    shippingFirstName,
    shippingLastName,
    shippingCompany,
    shippingAddress,
    shippingCity,
    shippingPostcode,
    shippingCountry,
    shippingState,
    shippingEmail,
    shippingPhone
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
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const newOrderData = {
      _id,
      billing: {
        firstName: billingFirstName,
        lastName: billingLastName,
        company: billingCompany,
        address: billingAddress,
        city: billingCity,
        postcode: billingPostcode,
        country: billingCountry,
        state: billingState,
        email: billingEmail,
        phone: billingPhone
      },
      shipping: {
        firstName: shippingFirstName,
        lastName: shippingLastName,
        company: shippingCompany,
        address: shippingAddress,
        city: shippingCity,
        postcode: shippingPostcode,
        country: shippingCountry,
        state: shippingState,
        email: shippingEmail,
        phone: shippingPhone
      }
    }

    dispatch(updateOrder(newOrderData))

    if(isSuccess) {
      closeModal()
    }
  }
  
  const handlePageTurn = () => {
    if(page === 1) {
      setFormPageData({
        page: 2,
        leftArrowDisabled: false,
        rightArrowDisabled: true
      })
    } else if(page === 2) {
      setFormPageData({
        page: 1,
        leftArrowDisabled: true,
        rightArrowDisabled: false
      })
    }
  }

  return (
    <StyledFormContainer>
      <StyledFormHeader>
        <StyledLeftArrowButton
          disabled={leftArrowDisabled}
          inactiveColor={leftArrowDisabled ? "#ffffff" : "#000000"}
          inactiveCursor={leftArrowDisabled ? "default" : "pointer"}
          onClick={handlePageTurn}
        >
          <AiOutlineArrowLeft />
        </StyledLeftArrowButton>
        <h1>
          <MdOutlineEdit />
          Edit Contact Info
        </h1>
        <StyledRightArrowButton
          disabled={rightArrowDisabled}
          inactiveColor={rightArrowDisabled ? "#ffffff" : "#000000"}
          inactiveCursor={rightArrowDisabled ? "default" : "pointer"}
          onClick={handlePageTurn}
        >
          <AiOutlineArrowRight />
        </StyledRightArrowButton>
      </StyledFormHeader>
      <StyledForm onSubmit={onSubmit}>
        <StyledOuterInputContainer>
          {page === 1 ? (
            <>
              <StyledInnerInputContainer>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='billingFirstName'
                    id='billingFirstName'
                    value={billingFirstName}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="billingFirstName">Billing First Name</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='billingCompany'
                    id='billingCompany'
                    value={billingCompany}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="billingCompany">Billing Company</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='billingCity'
                    id='billingCity'
                    value={billingCity}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="billingCity">Billing City</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='billingCountry'
                    id='billingCountry'
                    value={billingCountry}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="billingCountry">Billing Country</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='billingEmail'
                    id='billingEmail'
                    value={billingEmail}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="billingEmail">Billing Email</StyledFormLabel>
                </StyledFormGroup>
              </StyledInnerInputContainer>
              <StyledInnerInputContainer>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='billingLastName'
                    id='billingLastName'
                    value={billingLastName}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="billingLastName">Billing Last Name</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='billingAddress'
                    id='billingAddress'
                    value={billingAddress}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="billingAddress">Billing Address</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='billingPostcode'
                    id='billingPostcode'
                    value={billingPostcode}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="billingPostcode">Billing Postcode</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='billingState'
                    id='billingState'
                    value={billingState}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="billingState">Billing State</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='billingPhone'
                    id='billingPhone'
                    value={billingPhone}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="billingPhone">Billing Phone</StyledFormLabel>
                </StyledFormGroup>
              </StyledInnerInputContainer>
            </>
          ) : null}
          {page === 2 ? (
            <>
              <StyledInnerInputContainer>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='shippingFirstName'
                    id='shippingFirstName'
                    value={shippingFirstName}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="shippingFirstName">Shipping First Name</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='shippingCompany'
                    id='shippingCompany'
                    value={shippingCompany}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="shippingCompany">Shipping Company</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='shippingCity'
                    id='shippingCity'
                    value={shippingCity}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="shippingCity">Shipping City</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='shippingCountry'
                    id='shippingCountry'
                    value={shippingCountry}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="shippingCountry">Shipping Country</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='shippingEmail'
                    id='shippingEmail'
                    value={shippingEmail}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="shippingEmail">Shipping Email</StyledFormLabel>
                </StyledFormGroup>
              </StyledInnerInputContainer>
              <StyledInnerInputContainer>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='shippingLastName'
                    id='shippingLastName'
                    value={shippingLastName}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="shippingLastName">Shipping Last Name</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='shippingAddress'
                    id='shippingAddress'
                    value={shippingAddress}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="shippingAddress">Shipping Address</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='shippingPostcode'
                    id='shippingPostcode'
                    value={shippingPostcode}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="shippingPostcode">Shipping Postcode</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='shippingState'
                    id='shippingState'
                    value={shippingState}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="shippingState">Shipping State</StyledFormLabel>
                </StyledFormGroup>
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='shippingPhone'
                    id='shippingPhone'
                    value={shippingPhone}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="shippingPhone">Shipping Phone</StyledFormLabel>
                </StyledFormGroup>
              </StyledInnerInputContainer>
            </>
          ) : null}
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

export default UpdateContactsForm

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
  display: flex;
  color: #000000;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #009879;
`

const StyledLeftArrowButton = styled.button`
  margin: 0;
  padding: 0 0 0 40px;
  border: none;
  background: none;
  cursor: ${props => props.inactiveCursor};
  font-size: 30px;
  color: ${props => props.inactiveColor};
`

const StyledRightArrowButton = styled.button`
  margin: 0;
  padding: 0 40px 0 0;
  border: none;
  background: none;
  cursor: ${props => props.inactiveCursor};
  font-size: 30px;
  color: ${props => props.inactiveColor};
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