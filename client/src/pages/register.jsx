//This is the register page. This is where a user will register to use the app. Roles and departments will be added on this screen.

import {
  useState,
  useEffect
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';
import {
  register,
  reset
} from '../features/auth/authSlice';
import Spinner from '../components/Spinner/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: '',
    departmentRole: '',
    department: '',
    password: '',
    passwordConfirmation: ''
  })

  const {
    name,
    email,
    userType,
    departmentRole,
    department,
    password,
    passwordConfirmation
  } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message
  } = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/dashboard/production')
    }

    dispatch(reset())

  }, [
    user,
    isError,
    isSuccess,
    message,
    navigate,
    dispatch
  ])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    // console.log(`Name: ${e.target.name} | Value: ${e.target.value}`)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== passwordConfirmation) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        userType,
        departmentRole,
        department,
        password
      }

      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <StyledRegisterViewContainer>
      <StyledFormContainer>
        <StyledFormHeader>
          <h1>
            <FaUser /> Register
          </h1>
        </StyledFormHeader>
        <StyledForm onSubmit={onSubmit}>
          <StyledOuterInputContainer>
            <StyledInnerInputContainer>
              <StyledFormGroup>
                <StyledTextInput 
                  type='text' 
                  id='name' 
                  name='name' 
                  value={name} 
                  required
                  onChange={onChange}
                />
                <StyledFormSpan></StyledFormSpan>
                <StyledFormLabel htmlFor="name">Name</StyledFormLabel>
              </StyledFormGroup>
              <StyledFormGroup>
                <StyledTextInput 
                  type='email' 
                  id='email' 
                  name='email' 
                  value={email} 
                  required
                  onChange={onChange}
                />
                <StyledFormSpan></StyledFormSpan>
                <StyledFormLabel htmlFor="email">Email</StyledFormLabel>
              </StyledFormGroup>
              <StyledFormGroup>
                <StyledTextInput 
                  type='password' 
                  id='password' 
                  name='password' 
                  value={password} 
                  required
                  onChange={onChange}
                />
                <StyledFormSpan></StyledFormSpan>
                <StyledFormLabel htmlFor="password">Password</StyledFormLabel>
              </StyledFormGroup>
              <StyledFormGroup>
                <StyledTextInput 
                  type='password' 
                  id='passwordConfirmation' 
                  name='passwordConfirmation' 
                  value={passwordConfirmation} 
                  required
                  onChange={onChange}
                />
                <StyledFormSpan></StyledFormSpan>
                <StyledFormLabel htmlFor="passwordConfirmation">Confirm Password</StyledFormLabel>
              </StyledFormGroup>
            </StyledInnerInputContainer>
            <StyledInnerInputContainer>
              <StyledFormSelectGroup>
                <StyledSelect
                  name='userType'
                  id='userType'
                  required
                  onChange={onChange}
                >
                  <StyledSelectOption value=""></StyledSelectOption>
                  <StyledSelectOption value="Admin">Admin</StyledSelectOption>
                  <StyledSelectOption value="Production">Production</StyledSelectOption>
                </StyledSelect>
                <StyledFormSpan></StyledFormSpan>
                <StyledSelectLabel htmlFor="userType">User Type</StyledSelectLabel>
              </StyledFormSelectGroup>
              {userType === 'Production' ? (
                <>
                  <StyledFormSelectGroup>
                    <StyledSelect
                      name='department'
                      id='department'
                      required
                      onChange={onChange}
                    >
                      <StyledSelectOption value=""></StyledSelectOption>
                      <StyledSelectOption value="Fiberglass">Fiberglass</StyledSelectOption>
                      <StyledSelectOption value="Hardware">Hardware</StyledSelectOption>
                      <StyledSelectOption value="Trim">Trim</StyledSelectOption>
                      <StyledSelectOption value="Interiors">Interiors</StyledSelectOption>
                      <StyledSelectOption value="Shipping">Shipping</StyledSelectOption>
                    </StyledSelect>
                    <StyledFormSpan></StyledFormSpan>
                    <StyledSelectLabel htmlFor="department">Department</StyledSelectLabel>
                  </StyledFormSelectGroup>
                  <StyledFormSelectGroup>
                    <StyledSelect
                      name='departmentRole'
                      id='departmentRole'
                      required
                      onChange={onChange}
                    >
                      <StyledSelectOption value=""></StyledSelectOption>
                      <StyledSelectOption value="Lead">Lead</StyledSelectOption>
                      <StyledSelectOption value="Non-lead">Non-lead</StyledSelectOption>
                    </StyledSelect>
                    <StyledFormSpan></StyledFormSpan>
                    <StyledSelectLabel htmlFor="departmentRole">Department Role</StyledSelectLabel>
                  </StyledFormSelectGroup>
                </>
              ) : (
                null
              )}
            </StyledInnerInputContainer>
          </StyledOuterInputContainer>
          <StyledFormButtonContainer>
            <StyledSubmitButton type='submit'>
              Submit
            </StyledSubmitButton>
          </StyledFormButtonContainer>
        </StyledForm>
      </StyledFormContainer>
    </StyledRegisterViewContainer>
  )
}

export default Register

const StyledRegisterViewContainer = styled.div`

`

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
  color: #000000;
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #ffffff;
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

const StyledFormButtonContainer = styled.div`
  margin: 0 0 20px 0;
`

const StyledSubmitButton = styled.button`
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