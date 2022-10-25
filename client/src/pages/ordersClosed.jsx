//This is the Orders Closed page.

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

function OrdersClosed() {
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

  // useEffect(() => {
  //   if(isError) {
  //     toast.error(message)
  //   }

  //   if(isSuccess || user) {
  //     navigate('/dashboard')
  //   }

  //   dispatch(reset())

  // }, [
  //   user,
  //   isError,
  //   isSuccess,
  //   message,
  //   navigate,
  //   dispatch
  // ])

  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value
  //   }))
  // }

  // const onSubmit = (e) => {
  //   e.preventDefault()

  //   const userData = {
  //     email,
  //     password
  //   }

  //   dispatch(login(userData))
  // }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <StyledOrdersClosedViewContainer>
      <h1>Orders Closed</h1>
    </StyledOrdersClosedViewContainer>
  )
}

export default OrdersClosed

const StyledOrdersClosedViewContainer = styled.div`

`