//This is the landing page. This page is seen before a user presses the login or register buttons. This is also seen when someone logs out.

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components';

function Landing() {
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)
  
  let goToDashboard = false;

  if(user) {
    if(user.userType === "Admin" || user.departmentRole === "Lead") {
      goToDashboard = true
    } else {
      goToDashboard = false
    }
  }
  
  useEffect(() => {
    if(user) {
      if(goToDashboard) {
        navigate('/dashboard/production')
      } else {
        navigate('/ready-scan')
      }
    }
  }, [user, navigate])

  return (
    <StyledLandingContainer>
      {user ? (
        null
      ) : (
        <p>Calton Cases Production Tracker</p>
      )}
    </StyledLandingContainer>
  )
}

export default Landing

const StyledLandingContainer = styled.div`
  background-color: #000000;
  color: #afafaf;
  border-radius: 10px;
  border: 5px solid #009879;
  position: absolute;
  // width: 50vw;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 100px;
`