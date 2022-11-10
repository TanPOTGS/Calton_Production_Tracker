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
  updateOrder,
  updateOrdersStatus,
  resetOrders
} from '../features/orders/orderSlice';
import Spinner from '../components/Spinner/Spinner';
import Modal from '../components/Modal/Modal';
import OrderItemInReview from '../components/OrderItem/OrderItemInReview';
import {
  MdOutlineEdit,
  MdDelete,
  MdAddComment
} from 'react-icons/md'
import styled from 'styled-components';

function OrderReview(props) {
  const [selectedOrders, setSelectedOrders] = useState([])
  const [sidebarData, setSidebarData] = useState({
    order: null,
    orderNumber: '',
    billing: {
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      city: '',
      postcode: '',
      country: '',
      state: '',
      email: '',
      phone: ''
    },
    shipping: {
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      city: '',
      postcode: '',
      country: '',
      state: '',
      email: '',
      phone: ''
    },
    orderNote: '',
    comments: []
  })

  const {
    order,
    orderNumber,
    billing,
    shipping,
    orderNote,
    comments
  } = sidebarData

  const {
    displayModal,
    modalType,
    orderDataForModal,
    toggleCreateOrderModal,
    toggleDeleteOrderModal,
    toggleEditOrderModal,
    toggleEditContactInfoModal,
    toggleAddCommentModal,
    toggleAddOrderNoteModal,
    closeModal
  } = props

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    user
  } = useSelector((state) => state.auth)

  const {
    orders,
    isSuccess,
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
      dispatch(resetOrders())
    }

    dispatch(getOrders())
  }, [
    user,
    isError,
    message,
    navigate,
    dispatch
  ])

  const clearSidebarState = () => {
    setSidebarData({
      order: null,
      orderNumber: '',
      billing: {
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        city: '',
        postcode: '',
        country: '',
        state: '',
        email: '',
        phone: ''
      },
      shipping: {
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        city: '',
        postcode: '',
        country: '',
        state: '',
        email: '',
        phone: ''
      },
      orderNote: '',
      comments: []
    })
  }

  if (isLoading) {
    return <Spinner />
  }

  const handleOrderSelect = (isChecked, orderDataForToggle) => {
    if(!isChecked) {
      selectedOrders.push(orderDataForToggle)
    } else {
      const i = selectedOrders.indexOf(orderDataForToggle)
      selectedOrders.splice(i, 1)
    }
  }

  const handleOrderNotesDisplay = (orderData) => {
    setSidebarData({
      order: orderData,
      orderNumber: orderData.wcNumber,
      billing: {
        firstName: orderData.billing.firstName,
        lastName: orderData.billing.lastName,
        company: orderData.billing.company,
        address: orderData.billing.address,
        city: orderData.billing.city,
        postcode: orderData.billing.postcode,
        country: orderData.billing.country,
        state: orderData.billing.state,
        email: orderData.billing.email,
        phone: orderData.billing.phone
      },
      shipping: {
        firstName: orderData.shipping.firstName,
        lastName: orderData.shipping.lastName,
        company: orderData.shipping.company,
        address: orderData.shipping.address,
        city: orderData.shipping.city,
        postcode: orderData.shipping.postcode,
        country: orderData.shipping.country,
        state: orderData.shipping.state,
        email: orderData.shipping.email,
        phone: orderData.shipping.phone
      },
      orderNote: orderData.orderNote,
      comments: orderData.comments
    })
  }

  const moveOrdersToNewStage = (status) => {
    const selectedIds = []

    selectedOrders.map((selectedOrder) => {
      selectedIds.push(selectedOrder.orderId)
    })

    const ordersToUpdate = {
      status: status,
      ids: selectedIds
    }

    dispatch(updateOrdersStatus(ordersToUpdate))
    setSelectedOrders([])
  }

  const toggleOrderColor = (prop) => {
    let orderToUpdate = {};

    selectedOrders.map((selectedOrder) => {
      orderToUpdate = {
        _id: selectedOrder.orderId,
        [prop]: !selectedOrder[prop],
      }

      dispatch(updateOrder(orderToUpdate))
      setSelectedOrders([])
    })
  }

  return (
    <StyledOrderReviewViewContainer>
      <StyledMenuContainer>
        <StyledNewOrderButton onClick={toggleCreateOrderModal}>
          Add New Order
        </StyledNewOrderButton>
        <StyledMenuButton
          onClick={() => moveOrdersToNewStage('production')}
          disabled={selectedOrders.length < 1}
          backgroundColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
          textColor={selectedOrders.length < 1 ? '#ffffff' : '#000000'}
          cursor={selectedOrders.length < 1 ? 'default' : 'pointer'}
        >
          Move To Production
        </StyledMenuButton>
        <StyledMenuButton
          onClick={() => moveOrdersToNewStage('hold')}
          disabled={selectedOrders.length < 1}
          backgroundColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
          textColor={selectedOrders.length < 1 ? '#ffffff' : '#000000'}
          cursor={selectedOrders.length < 1 ? 'default' : 'pointer'}
        >
          Move To Hold
        </StyledMenuButton>
        <StyledMenuButton
          onClick={() => moveOrdersToNewStage('closed')}
          disabled={selectedOrders.length < 1}
          backgroundColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
          textColor={selectedOrders.length < 1 ? '#ffffff' : '#000000'}
          cursor={selectedOrders.length < 1 ? 'default' : 'pointer'}
        >
          Move To Closed
        </StyledMenuButton>
        <StyledMenuButton
          onClick={() => toggleOrderColor('isMarigold')}
          disabled={selectedOrders.length < 1}
          backgroundColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
          textColor={selectedOrders.length < 1 ? '#ffffff' : '#000000'}
          cursor={selectedOrders.length < 1 ? 'default' : 'pointer'}
        >
          Toggle Marigold
        </StyledMenuButton>
        <StyledMenuButton
          onClick={() => toggleOrderColor('expedite')}
          disabled={selectedOrders.length < 1}
          backgroundColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
          textColor={selectedOrders.length < 1 ? '#ffffff' : '#000000'}
          cursor={selectedOrders.length < 1 ? 'default' : 'pointer'}
        >
          Toggle Expedite
        </StyledMenuButton>
      </StyledMenuContainer>
      {displayModal && <Modal
        closeModal={closeModal}
        modalType={modalType}
        orderDataForModal={orderDataForModal}
        handleOrderNotesDisplay={handleOrderNotesDisplay}
        clearSidebarState={clearSidebarState}
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
                <StyledOrderTableHeadRowSection>PO Number</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Pricing</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Serial Number</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Date Shipped</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Tracking Number</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>QB/PP Invoice</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>QB Invoice Date</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Invoice Sent Via</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Payment Due Date</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Payment Received Date</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Order Status</StyledOrderTableHeadRowSection>
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
                    handleOrderNotesDisplay={handleOrderNotesDisplay}
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
            <StyledOrderNumberContainer>
              <StyledOrderNumber>{orderNumber}</StyledOrderNumber>
              {orderNumber ? (
                <StyledEditIcon
                  onClick={() => toggleEditContactInfoModal(order)}
                />
              ) : (
                null
              )}
            </StyledOrderNumberContainer>
            <StyledContactInfo>
              <StyledBillingContainer>
                <StyledBillingTitle>Billing:</StyledBillingTitle>
                <p>{billing.firstName}</p>
                <p>{billing.lastName}</p>
                <p>{billing.company}</p>
                <p>{billing.address}</p>
                <p>{billing.city}</p>
                <p>{billing.postcode}</p>
                <p>{billing.country}</p>
                <p>{billing.state}</p>
                <StyledEmailTitle>Email:</StyledEmailTitle>
                <p>{billing.email}</p>
                <StyledPhoneTitle>Phone:</StyledPhoneTitle>
                <p>{billing.phone}</p>
              </StyledBillingContainer>
              <StyledShippingContainer>
                <StyledShippingTitle>Shipping:</StyledShippingTitle>
                <p>{shipping.firstName}</p>
                <p>{shipping.lastName}</p>
                <p>{shipping.company}</p>
                <p>{shipping.address}</p>
                <p>{shipping.city}</p>
                <p>{shipping.postcode}</p>
                <p>{shipping.country}</p>
                <p>{shipping.state}</p>
                <StyledEmailTitle>Email:</StyledEmailTitle>
                <p>{shipping.email}</p>
                <StyledPhoneTitle>Phone:</StyledPhoneTitle>
                <p>{shipping.phone}</p>
              </StyledShippingContainer>
            </StyledContactInfo>
            <StyledOrderNotesContainer>
              <StyledOrderNotesHeader>
                <h2>Important Notes About Build:</h2>
                {order ? (
                  <StyledAddCommentIcon 
                    onClick={() => toggleAddOrderNoteModal(order)}
                  />
                ) : (
                  null
                )}
              </StyledOrderNotesHeader>
              <StyledOrderNoteBody>
                {orderNote ? (
                  <StyledOrderNote>
                    {orderNote}
                  </StyledOrderNote>
                ) : (
                  null
                )}
              </StyledOrderNoteBody>
            </StyledOrderNotesContainer>
            <StyledCommentsContainer>
              <StyledCommentHeaderContainer>
                <h2>Comments:</h2>
                {order ? (
                <StyledAddCommentIcon 
                  onClick={() => toggleAddCommentModal(order)}
                />
              ) : (
                null
              )}
              </StyledCommentHeaderContainer>
              {comments.length > 0 ? (
              <div>
                {comments.map((comment) => (
                  <StyledCommentBody 
                    key={comment.commentId}
                  >
                    {comment.recipients.length >= 1 ? (
                      <>
                        <p>People Tagged:</p>
                        <ul>
                          {comment.commentRecipients.map((recipient) => (
                            <li>{recipient}</li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      null
                    )}
                    <StyledComment>{comment.body}</StyledComment>
                    <StyledCommentAuthor>Posted by: {comment.author}</StyledCommentAuthor>
                  </StyledCommentBody>
                ))}
              </div>
            ) : (
              <div>
                {order ? (
                  <h3>No comments to display</h3>
                ) : (
                  null
                )}
              </div>
            )}
            </StyledCommentsContainer>
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

const StyledNewOrderButton = styled.button`
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

const StyledMenuButton = styled.button`
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  background: #000000;
  color: #ffffff;
  font-size: 16px;
  cursor: ${props => props.cursor};
  text-align: center;
  appearance: button;
  transition: all 0.3s ease 0s;
  &:hover {
    color: ${props => props.textColor};
    background-color: ${props => props.backgroundColor};
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
  overflow: auto;
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

const StyledContactInfo = styled.div`
  border-bottom: 3px solid #afafaf;
`

const StyledBillingContainer = styled.div`
  padding: 10px;
`

const StyledShippingContainer = styled.div`
  padding: 10px;
`

const StyledOrderNotesContainer = styled.div`
  padding: 10px;
  border-bottom: 3px solid #afafaf;
`

const StyledOrderNotesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledOrderNoteBody = styled.div`
  padding: 10px;
  white-space: pre-wrap;
`

const StyledOrderNote = styled.p`
  font-weight: 700;
`

const StyledCommentsContainer = styled.div`
  padding: 10px;
`

const StyledCommentHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledAddCommentIcon = styled(MdAddComment)`
  display: block;  
  font-size: 24px;
  color: #009879;
  padding: 10px;
  cursor: pointer;
`

const StyledComment = styled.p`
  // padding: 20px 5px;
`

const StyledCommentAuthor = styled.p`
  padding-top: 10px;
  font-size: .7rem;
  font-weight: 700;
`

const StyledCommentBody = styled.div`
  // display: flex;
  padding: 20px 5px;
  border-bottom: 2px solid #afafaf;
`

const StyledOrderNumberContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledOrderNumber = styled.h1`
  padding: 10px;
`

const StyledEditIcon = styled(MdOutlineEdit)`
  display: block;  
  font-size: 32px;
  color: #edb72f;
  padding: 10px;
  align-self: center;
  cursor: pointer;
`

const StyledBillingTitle = styled.h2`
  padding-bottom: 10px;
  color: #009879;
`

const StyledShippingTitle = styled.h2`
  padding-bottom: 10px;
  color: #009879;
`

const StyledEmailTitle = styled.h3`
  padding: 10px 0;
  color: #009879;
`

// const StyledEmail = styled.p`
//   overflow-wrap: anywhere;
// `

const StyledPhoneTitle = styled.h3`
  padding: 10px 0;
  color: #009879;
`