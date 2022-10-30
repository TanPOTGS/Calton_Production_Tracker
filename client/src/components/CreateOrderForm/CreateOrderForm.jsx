//This is the order form component. It is used to create a new order in the database. Add form fields in this component.

import {
  useState
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  createNewOrder
} from '../../features/orders/orderSlice';
import { RiAddFill } from 'react-icons/ri'
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight
} from 'react-icons/ai'
import styled from 'styled-components';

function CreateOrderForm({ closeModal }) {
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
    reviewStatus: '',
    submitDate: '',
    reviewDate: '',
    eligibleForProductionDate: '',
    wcNumber: '',
    modelCode: '',
    customer: '',
    caltonRep: '',
    engraving: '',
    pricing: '',
    orderStatus: '',
    billingFirstName: '',
    billingLastName: '',
    billingCompany: '',
    billingAddress: '',
    billingCity: '',
    billingPostcode: '',
    billingCountry: '',
    billingState: '',
    billingEmail: '',
    billingPhone: '',
    shippingFirstName: '',
    shippingLastName: '',
    shippingCompany: '',
    shippingAddress: '',
    shippingCity: '',
    shippingPostcode: '',
    shippingCountry: '',
    shippingState: '',
    shippingEmail: '',
    shippingPhone: '',
  })
  
  const {
    reviewStatus,
    submitDate,
    reviewDate,
    eligibleForProductionDate,
    wcNumber,
    modelCode,
    customer,
    caltonRep,
    engraving,
    pricing,
    orderStatus,
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
    // console.log(`Name: ${e.target.name} | Value: ${e.target.value}`)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const orderData = {
      reviewStatus,
      submitDate,
      reviewDate,
      eligibleForProductionDate,
      wcNumber,
      modelCode,
      customer,
      caltonRep,
      engraving,
      pricing,
      orderStatus,
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

    dispatch(createNewOrder(orderData))

    setFormData({
      reviewStatus: '',
      submitDate: '',
      reviewDate: '',
      eligibleForProductionDate: '',
      wcNumber: '',
      modelCode: '',
      customer: '',
      caltonRep: '',
      engraving: '',
      pricing: '',
      orderStatus: '',
      billingFirstName: '',
      billingLastName: '',
      billingCompany: '',
      billingAddress: '',
      billingCity: '',
      billingPostcode: '',
      billingCountry: '',
      billingState: '',
      billingEmail: '',
      billingPhone: '',
      shippingFirstName: '',
      shippingLastName: '',
      shippingCompany: '',
      shippingAddress: '',
      shippingCity: '',
      shippingPostcode: '',
      shippingCountry: '',
      shippingState: '',
      shippingEmail: '',
      shippingPhone: '',
    })

    if(isSuccess) {
      closeModal()
    }
  }

  const handlePageTurn = (arrow) => {
    if(page === 1 || page === 3) {
      setFormPageData({
        page: 2,
        leftArrowDisabled: false,
        rightArrowDisabled: false
      })
    } else if(page === 2) {
      if(arrow === "left") {
        setFormPageData({
          page: 1,
          leftArrowDisabled: true,
          rightArrowDisabled: false
        })
      } else if(arrow === "right") {
        setFormPageData({
          page: 3,
          leftArrowDisabled: false,
          rightArrowDisabled: true
        })
      }
    }
  }
  
  return (
    <StyledFormContainer>
      <StyledFormHeader>
        <StyledLeftArrowButton
          disabled={leftArrowDisabled}
          inactiveColor={leftArrowDisabled ? "#ffffff" : "#000000"}
          inactiveCursor={leftArrowDisabled ? "default" : "pointer"}
          onClick={() => handlePageTurn("left")}
        >
          <AiOutlineArrowLeft />
        </StyledLeftArrowButton>
        <h1>
          <RiAddFill />
          New Order
        </h1>
        <StyledRightArrowButton
          disabled={rightArrowDisabled}
          inactiveColor={rightArrowDisabled ? "#ffffff" : "#000000"}
          inactiveCursor={rightArrowDisabled ? "default" : "pointer"}
          onClick={() => handlePageTurn("right")}
        >
          <AiOutlineArrowRight />
        </StyledRightArrowButton>
      </StyledFormHeader>
      <StyledForm onSubmit={onSubmit}>
        <StyledOuterInputContainer>
          {page === 1 ? (
            <>
              <StyledInnerInputContainer>
                <StyledFormSelectGroup>
                  <StyledSelect
                    name='reviewStatus'
                    id='reviewStatus'
                    defaultValue={reviewStatus}
                    required
                    onChange={onChange}
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
                <StyledFormGroup>
                  <StyledTextInput 
                    type="text" 
                    name='engraving'
                    id='engraving'
                    value={engraving}
                    onChange={onChange}
                    // required
                  />
                  <StyledFormSpan></StyledFormSpan>
                  <StyledFormLabel htmlFor="engraving">Engraving Text</StyledFormLabel>
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
                <StyledFormSelectGroup>
                  <StyledSelect
                    name='pricing'
                    id='pricing'
                    defaultValue={pricing}
                    required
                    onChange={onChange}
                  >
                    <StyledSelectOption value=""></StyledSelectOption>
                    <StyledSelectOption value="Artist">Artist</StyledSelectOption>
                    <StyledSelectOption value="Direct">Direct</StyledSelectOption>
                    <StyledSelectOption value="Luxury Partner">Luxury Partner</StyledSelectOption>
                    <StyledSelectOption value="Partner">Partner</StyledSelectOption>
                    <StyledSelectOption value="Price Adjustment">Price Adjustment</StyledSelectOption>
                    <StyledSelectOption value="Repair">Repair</StyledSelectOption>
                  </StyledSelect>
                  <StyledFormSpan></StyledFormSpan>
                  <StyledSelectLabel htmlFor="pricing">Pricing</StyledSelectLabel>
                </StyledFormSelectGroup>
              </StyledInnerInputContainer>
            </>
          ) : null}
          {page === 2 ? (
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
          {page === 3 ? (
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
            Add Order
          </StyledSubmitButton>
          <StyledCancelButton onClick={closeModal}>
            Cancel
          </StyledCancelButton>
        </StyledFormButtonContainer>
      </StyledForm>
    </StyledFormContainer>
  )
}

export default CreateOrderForm

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

const StyledOuterInputContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
`

const StyledInnerInputContainer = styled.div`
  width: 100%;
  padding: 0 10px;
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