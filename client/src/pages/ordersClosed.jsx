//This is the Closed Orders page.

import {
  useState,
  useEffect
} from 'react'
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
import {
  MdOutlineEdit,
  MdDelete,
  MdAddComment
} from 'react-icons/md'
import Spinner from '../components/Spinner/Spinner';
import Modal from '../components/Modal/Modal';
import OrderItemInProduction from '../components/OrderItem/OrderItemInProduction';
import styled from 'styled-components';

function OrdersClosed(props) {
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

  const handleOrderSelect = (isChecked, orderId) => {
    if(!isChecked) {
      selectedOrders.push(orderId)
    } else {
      const i = selectedOrders.indexOf(orderId)
      selectedOrders.splice(i, 1)
    }
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
    clearSidebarState()
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

  if(isLoading) {
    return <Spinner />
  }

  return (
    <StyledOrdersClosedViewContainer>
      <StyledMenuContainer>
        <StyledFirstMenuButton
          onClick={() => moveOrdersToNewStage('review')}
          disabled={selectedOrders.length < 1}
          backgroundColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
          borderColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
          textColor={selectedOrders.length < 1 ? '#ffffff' : '#000000'}
          cursor={selectedOrders.length < 1 ? 'default' : 'pointer'}
        >
          Move Back To Review
        </StyledFirstMenuButton>
        <StyledMenuButton
          onClick={() => moveOrdersToNewStage('production')}
          disabled={selectedOrders.length < 1}
          backgroundColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
          borderColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
          textColor={selectedOrders.length < 1 ? '#ffffff' : '#000000'}
          cursor={selectedOrders.length < 1 ? 'default' : 'pointer'}
        >
          Move Back To Production
        </StyledMenuButton>
        <StyledMenuButton
          onClick={() => toggleOrderColor('isMarigold')}
          disabled={selectedOrders.length < 1}
          backgroundColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
          borderColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
          textColor={selectedOrders.length < 1 ? '#ffffff' : '#000000'}
          cursor={selectedOrders.length < 1 ? 'default' : 'pointer'}
        >
          Toggle Marigold
        </StyledMenuButton>
        <StyledMenuButton
          onClick={() => toggleOrderColor('expedite')}
          disabled={selectedOrders.length < 1}
          backgroundColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
          borderColor={selectedOrders.length < 1 ? '#000000' : '#88f7ba'}
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
                <StyledOrderTableHeadRowSection>WC Order Number</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Model Code</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Customer</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Calton Rep</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Production Received Date</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Age</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Ship By Date</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Into Fiberglass On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed In By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out Of Fiberglass On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Moved Into Hardware 1 On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Started On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Started By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out Of Hardware 1 On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Moved Into Trim 1 On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Started On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Started By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out Of Trim 1 On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Moved Into Hardware 2 On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Started On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Started By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out Of Hardware 2 On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Moved Into Interiors On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Started On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Started By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out Of Interiors On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Moved Into Trim 2 On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Started On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Started By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out Of Trim 2</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Moved Into Shipping On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Started On</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Started By</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection></StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out Of Shipping</StyledOrderTableHeadRowSection>
                <StyledOrderTableHeadRowSection>Signed Out By</StyledOrderTableHeadRowSection>
              </StyledOrderTableHeadRow>
            </StyledOrderTableHead>
            {orders.length > 0 ? (
              <StyledOrderTableBody>
                {orders.map((order) => (order.orderCurrentState === "closed" &&
                  <OrderItemInProduction 
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
    </StyledOrdersClosedViewContainer>
  )
}

export default OrdersClosed

const StyledOrdersClosedViewContainer = styled.div`
  height: 100%;
  width: 100%;
`

const StyledMenuContainer = styled.div`
  height: 5%;
  background-color: #000000;
  margin: 0;
`

const StyledOrdersContainer = styled.div`
  height: 95%;
  display: flex;
`

const StyledFirstMenuButton = styled.button`
  padding: 10px;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  border-left: 1px solid #000000;
  border-right: 1px solid #009879;
  background: #000000;
  color: #ffffff;
  font-size: 16px;
  cursor: ${props => props.cursor};
  text-align: center;
  appearance: button;
  transition: all 0.3s ease 0s;
  &:hover {
    color: ${props => props.textColor};
    border-top: 1px solid ${props => props.borderColor};
    border-bottom: 1px solid ${props => props.borderColor};
    border-left: 1px solid ${props => props.borderColor};
    border-right: 1px solid #009879;
    background-color: ${props => props.backgroundColor};
  }
`

const StyledMenuButton = styled.button`
  padding: 10px;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  border-left: 1px solid #009879;
  border-right: 1px solid #009879;
  background: #000000;
  color: #ffffff;
  font-size: 16px;
  cursor: ${props => props.cursor};
  text-align: center;
  appearance: button;
  transition: all 0.3s ease 0s;
  &:hover {
    color: ${props => props.textColor};
    border-top: 1px solid ${props => props.borderColor};
    border-bottom: 1px solid ${props => props.borderColor};
    background-color: ${props => props.backgroundColor};
  }
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

const StyledOrderTable = styled.table`
  border-collapse: collapse;
  margin: 0;
  font-size: 1em;
  // height: 100%;
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