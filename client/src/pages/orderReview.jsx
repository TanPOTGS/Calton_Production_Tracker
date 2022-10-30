//This is the Orders Review page.

import {
  useState,
  useEffect
} from 'react';
import {
  useNavigate
} from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  getOrders,
  updateOrdersStatus,
  reset
} from '../features/orders/orderSlice';
import Spinner from '../components/Spinner/Spinner';
import Modal from '../components/Modal/Modal';
import OrderItemInReview from '../components/OrderItem/OrderItemInReview';
import styled from 'styled-components';

function OrderReview(props) {
  const [sidebarData, setSidebarData] = useState({
    orderNumber: '1000-0',
    billing: {
      firstName: 'Paul',
      lastName: 'Roque',
      company: 'Calton Cases',
      address: '6203 Waycross Dr.',
      city: 'Austin',
      postcode: '78745',
      country: 'United States',
      state: 'Texas',
      email: 'paulroque13@gmail.com',
      phone: '512-573-2335'
    },
    shipping: {
      firstName: 'Paul',
      lastName: 'Roque',
      company: 'Calton Cases',
      address: '6203 Waycross Dr.',
      city: 'Austin',
      postcode: '78745',
      country: 'United States',
      state: 'Texas',
      email: 'paulroque13@gmail.com',
      phone: '512-573-2335'
    },
    comments: []
  })

  const {
    orderNumber,
    billing,
    shipping,
    comments
  } = sidebarData

  const {
    displayModal,
    modalType,
    orderDataForModal,
    toggleCreateOrderModal,
    toggleDeleteOrderModal,
    toggleEditOrderModal,
    closeModal
  } = props

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    user
  } = useSelector((state) => state.auth)

  const {
    orders,
    isLoading,
    isError,
    message
  } = useSelector((state) => state.orders)
  
  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
    
    if (isError && user) {
      console.log(message);
      dispatch(reset())
    }

    dispatch(getOrders())
  }, [
    user,
    isError,
    message,
    navigate,
    dispatch
  ])

  if (isLoading) {
    return <Spinner />
  }

  const selectedOrders = []

  const handleOrderSelect = (isChecked, orderId) => {
    if(!isChecked) {
      selectedOrders.push(orderId)
    } else {
      const i = selectedOrders.indexOf(orderId)
      selectedOrders.splice(i, 1)
    }
  }

  const moveOrdersToNewStage = (status) => {
    const ordersToUpdate = {
      status: status,
      ids: selectedOrders
    }

    dispatch(updateOrdersStatus(ordersToUpdate))
  }

  return (
    <StyledOrderReviewViewContainer>
      <StyledMenuContainer>
        <StyledMenuButton onClick={toggleCreateOrderModal}>
          Add New Order
        </StyledMenuButton>
        <StyledMenuButton onClick={() => moveOrdersToNewStage('production')}>
          Move To Production
        </StyledMenuButton>
        <StyledMenuButton onClick={() => moveOrdersToNewStage('hold')}>
          Move To Hold
        </StyledMenuButton>
        <StyledMenuButton onClick={() => moveOrdersToNewStage('closed')}>
          Move To Closed
        </StyledMenuButton>
      </StyledMenuContainer>
      {displayModal && <Modal
        closeModal={closeModal}
        modalType={modalType}
        orderDataForModal={orderDataForModal}
      />}
      <StyledOrdersContainer>
        <StyledTableContainer>
          <StyledOrderTable>
            <StyledOrderTableHead>
              <StyledOrderTableHeadRow>
                <StyledOrderTableHeadRowSection>Actions</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Review Status</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Submit Date</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Review Date</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Eligible For Production On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>WC Order Number</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Model Code</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Customer</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Calton Rep</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Mold</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Standard Exterior Color</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>RAL#</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Exterior Finish</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Glitter Color</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Splatter One</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Splatter Two</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Splatter Three</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Taper</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Base Cut Depth</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Hardware Configuration</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Template</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Interior Build (Gearboxes only)</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Interior Color</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Nameplate Type</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Accessories</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Shipping Method</StyledOrderTableHeadRowSection>
              </StyledOrderTableHeadRow>
            </StyledOrderTableHead>
            {orders.length > 0 ? (
              <StyledOrderTableBody>
                {orders.map((order) => (order.orderCurrentState === "review" &&
                  <OrderItemInReview 
                    key={order._id}
                    order={order}
                    toggleEditModal={toggleEditOrderModal}
                    toggleDeleteModal={toggleDeleteOrderModal}
                    handleOrderSelect={handleOrderSelect}
                  />
                ))}
              </StyledOrderTableBody>
            ) : (
              <tbody>
                <tr>
                  <td>
                    {/* <h1>There are no orders to display</h1> */}
                  </td>
                </tr>
              </tbody>
            )}
          </StyledOrderTable>
        </StyledTableContainer>
        <StyledSidebarContainer>
          <StyledSidebarHeader>
            <StyledSidebarTitle>Notes</StyledSidebarTitle>
          </StyledSidebarHeader>
          <StyledSidebarBody>
            <p>{orderNumber}</p>
            <h2>Billing:</h2>
            <p>{billing.firstName}</p>
            <p>{billing.lastName}</p>
            <p>{billing.company}</p>
            <p>{billing.address}</p>
            <p>{billing.city}</p>
            <p>{billing.postcode}</p>
            <p>{billing.country}</p>
            <p>{billing.state}</p>
            <p>{billing.email}</p>
            <p>{billing.phone}</p>
            <h2>Shipping:</h2>
            <p>{shipping.firstName}</p>
            <p>{shipping.lastName}</p>
            <p>{shipping.company}</p>
            <p>{shipping.address}</p>
            <p>{shipping.city}</p>
            <p>{shipping.postcode}</p>
            <p>{shipping.country}</p>
            <p>{shipping.state}</p>
            <p>{shipping.email}</p>
            <p>{shipping.phone}</p>
            <h2>Comments:</h2>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
            <p>comment</p>
          </StyledSidebarBody>
        </StyledSidebarContainer>
      </StyledOrdersContainer>
    </StyledOrderReviewViewContainer>
  )
}

export default OrderReview

const StyledOrderReviewViewContainer = styled.div`
  height: 100%;
  width: 100%;
`

const StyledMenuContainer = styled.div`
  height: 5%;
  background-color: #000000;
  margin: 0;
`

const StyledMenuButton = styled.button`
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  background: #000000;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  appearance: button;
  transition: all 0.3s ease 0s;
  &:hover {
    color: #000000;
    background-color: #88f7ba;
  }
`

const StyledOrdersContainer = styled.div`
  height: 95%;
  display: flex;
`

const StyledTableContainer = styled.div`
  overflow: scroll;
  width: 78%;
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

const StyledOrderTable = styled.table`
  border-collapse: collapse;
  margin: 0;
  font-size: 1em;
  width: 100%;
`

const StyledOrderTableHead = styled.thead`

`

const StyledOrderTableHeadRow = styled.tr`
  position: sticky;
  top: 0;
  background-color: #009879;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
`

const StyledOrderTableHeadRowSection = styled.th`
  padding: 12px 15px;
`

const StyledOrderTableBody = styled.tbody`

`

const StyledSidebarContainer = styled.div`
  background-color: #ffffff;
  width: 22%;
  height: 100%;
`

const StyledSidebarHeader = styled.div`
  // border-bottom: 5px solid #009879;
  background-color: #e8e6e6;
  height: 10%;
`

const StyledSidebarTitle = styled.h1`
  padding: 20px 0 20px 20px;
`

const StyledSidebarBody = styled.div`
  overflow: scroll;
  height: 90%;
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