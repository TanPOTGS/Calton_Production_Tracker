//This is the header component. This is what is seen at the top of the app. Navigation button will be displayed here.

import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser
} from 'react-icons/fa'
import {
  Link,
  NavLink,
  useNavigate
} from 'react-router-dom'
import { 
  useSelector, 
  useDispatch 
} from 'react-redux';
import {
  logout, 
  reset
} from '../../features/auth/authSlice'
import { 
  resetOrders
} from '../../features/orders/orderSlice'
import caltonlogo from '../../caltonlogo.png'
import styled from 'styled-components';

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    dispatch(resetOrders())
    navigate('/')
  }

  let navButtons
    
  if(user && user.userType === "Admin") {
    navButtons = <>
      <StyledNavListItems>
        <StyledNavLink to='/order-review'>
          Order Review
        </StyledNavLink>
      </StyledNavListItems>
      <StyledNavListItems>
        <StyledNavLink to='/orders-hold'>
          Orders Hold
        </StyledNavLink>
      </StyledNavListItems>
      <StyledNavListItems>
        <StyledNavLink to='/orders-closed'>
          Orders Closed
        </StyledNavLink>
      </StyledNavListItems>
    </>
  } else {
    navButtons = null
  }

  return (
    <StyledHeader>
      <div>
        <Link to='/'>
          <StyledImg 
            src={caltonlogo} 
            alt="Calton Cases" 
          />
        </Link>
      </div>
      <nav>
        <StyledNavList>
          {user ? (
            <>
              <StyledNavListItems>
                <StyledNavLink to='/production'>
                  Production
                </StyledNavLink>
              </StyledNavListItems>
              {navButtons}
              <StyledNavListItems>
                <StyledButton onClick={onLogout}>
                  <FaSignOutAlt />Logout
                </StyledButton>
              </StyledNavListItems>
            </>
          ) : (
            <>
              <StyledNavListItems>
                <StyledNavLink to='/login'>
                  <FaSignInAlt />Login
                </StyledNavLink>
              </StyledNavListItems>
              <StyledNavListItems>
                <StyledNavLink to='/register'>
                  <FaUser />Register
                </StyledNavLink>
              </StyledNavListItems>
            </>
          )}
        </StyledNavList>
      </nav>
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding 15px 2%;
  background-color: #000000;
`

const StyledImg = styled.img`
  width: 100%;
  height: 60px;
  object-fit: cover;
`

const StyledNavList = styled.ul`
  list-style: none;
`

const StyledNavListItems = styled.li`
  display: inline-block;
`
const StyledNavLink = styled(NavLink)`
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  text-decoration: none;
  color: #ffffff;
  transition: all 0.3s ease 0s;
  &:hover {
    color: #62BF77;
  }
  &.active {
    background-color: #88f7ba;
    color: #000000;
  }
`

const StyledButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #000;
  border-radius: 5px;
  background: #000000;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  appearance: button;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  &:hover {
    color: #62BF77;
  }
`