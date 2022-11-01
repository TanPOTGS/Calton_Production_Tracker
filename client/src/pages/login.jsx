//This is the login page. This is where users will enter their email address and password to login to the app.

import {
  useState,
  useEffect
} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {FaSignInAlt} from 'react-icons/fa'
import {
  login,
  reset
} from '../features/auth/authSlice';
import Spinner from '../components/Spinner/Spinner';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {
    email,
    password,
  } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  let goToDashboard = false;

  if(user) {
    if(user.userType === "Admin" || user.departmentRole === "Lead") {
      goToDashboard = true
    } else {
      goToDashboard = false
    }
  }

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      if(goToDashboard) {
        navigate('/dashboard/production')
      } else {
        navigate('/ready-scan')
      }
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
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <StyledLoginViewContainer>
      <StyledFormContainer>
        <StyledFormHeader>
          <h1>
            <FaSignInAlt /> Login
          </h1>
        </StyledFormHeader>
        <StyledForm onSubmit={onSubmit}>
          <StyledFormGroup>
            <StyledFormInput 
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
            <StyledFormInput 
              type='password' 
              id='password' 
              name='password' 
              value={password} 
              required
              onChange={onChange}
            />
            <StyledFormSpan></StyledFormSpan>
            <StyledFormLabel htmlFor="Password">Password</StyledFormLabel>
          </StyledFormGroup>
          <StyledFormButtonContainer>
            <StyledFormButton type='submit'>
              Submit
            </StyledFormButton>
          </StyledFormButtonContainer>
        </StyledForm>
      </StyledFormContainer>
    </StyledLoginViewContainer>
  )
}

export default Login

const StyledLoginViewContainer = styled.div`

`

const StyledFormContainer = styled.section`
  background-color: #ffffff;
  border-radius: 10px;
  position: absolute;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledFormHeader = styled.div`
  color: #000000;
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #afafaf;
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

const StyledFormInput = styled.input`
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
  margin: 0 0 20px 0;
`

const StyledFormButton = styled.button`
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