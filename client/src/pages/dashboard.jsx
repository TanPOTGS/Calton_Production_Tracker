//This is the dashboard page. This is the first thing a user will see after loggin in.

import {
  useEffect
} from 'react'
import {
  Outlet,
  NavLink,
  useNavigate
} from 'react-router-dom'
import {
  useSelector
} from 'react-redux'
import styled from 'styled-components'

function Dashboard() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  
  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [
    user,
    navigate,
  ])

  return (
    <StyledDashboardViewContainer>
      <StyledMenuContainer>
        <StyledNavLink to='production'>
          Prduction Dashboard
        </StyledNavLink>
        <StyledNavLink to='admin'>
          Admin Dashboard
        </StyledNavLink>
      </StyledMenuContainer>
      <StyledDashboardContainer>
        <Outlet />
      </StyledDashboardContainer>
    </StyledDashboardViewContainer>
  )
}

export default Dashboard

const StyledDashboardViewContainer = styled.div`
  height: 100%;
  width: 100%;
`

const StyledMenuContainer = styled.div`
  height: 5%;
  background-color: #000000;
  margin: 0;
`

const StyledNavLink = styled(NavLink)`
  padding: 10px;
  display: inline-block;
  border: 1px solid #000;
  border-radius: 5px;
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease 0s;
  &:hover {
    color: #000000;
    background-color: #88f7ba;
  }
  &.active {
    color: #000000;
    background-color: #88f7ba;
  }
`

const StyledDashboardContainer = styled.div`
  overflow: scroll;
  height: 95%;
  width: 100%;
  &::-webkit-scrollbar {
    width: .5vw;
    height: 1vh;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #88f7ba;
  }
  &::-webkit-scrollbar-track {
    background-color: #009879;
  }
  &::-webkit-scrollbar-corner {
    background-color: #009879;
  }
`
