import {
  useState
} from 'react'
import {
  MdOutlineEdit,
  MdDelete
} from 'react-icons/md'
import styled from 'styled-components';

function OrderItemInClosed(props) {
  const [isChecked, setCheckbox] = useState(false)

  const {
    order,
    toggleEditModal,
    toggleDeleteModal,
    handleOrderSelect,
    handleOrderNotesDisplay
  } = props

  const convertDate = (date) => {
    if(date) {
      const convertedDate = new Date(date).toLocaleDateString('en-us', {timeZone: 'UTC'});

      return convertedDate
    }
  }

  const calculateAge = (receivedDate) => {
    if(receivedDate) {
      const date1 = new Date(receivedDate)
      const date2 = new Date()

      const rawAge = date2.getTime() - date1.getTime()

      const convertedAge = rawAge / 86400000

      return Math.floor(convertedAge)
    }
  }

  const toggleCheckbox = () => {
    const orderDataForToggle = {
      orderId: order._id,
      isMarigold: order.isMarigold,
      expedite: order.expedite
    }
    setCheckbox(!isChecked)
    handleOrderSelect(isChecked, orderDataForToggle)
  }

  let age = 56;

  return (
    <StyledOrderItem
      onClick={() => handleOrderNotesDisplay(order)}
      expediteColor={order.expedite ? 'red' : '#000000'}
    >
      <StyledActionsSegment>
        <StyledCheckbox
          type='checkbox'
          onChange={toggleCheckbox}
        />
        <StyledActionButton onClick={() => toggleEditModal(order)}>
          <StyledEditIcon />
        </StyledActionButton>
        <StyledActionButton onClick={() => toggleDeleteModal(order)}>
          <StyledDeleteIcon />
        </StyledActionButton>
      </StyledActionsSegment>
      <StyledOrderSegment
        marigoldColor={order.isMarigold ? '#ffed00' : 'transparent'}
      >
        {order.wcNumber}
      </StyledOrderSegment>
      <StyledModelCodeSegment
        marigoldColor={order.isMarigold ? '#ffed00' : 'transparent'}
      >
        {order.modelCode}
      </StyledModelCodeSegment>
      <StyledOrderSegment
        marigoldColor={order.isMarigold ? '#ffed00' : 'transparent'}
      >
        {order.customer}
      </StyledOrderSegment>
      <StyledOrderSegment
        marigoldColor={order.isMarigold ? '#ffed00' : 'transparent'}
      >
        {order.caltonRep}
      </StyledOrderSegment>
      <StyledDateSegment>{convertDate(order.productionReceivedDate)}</StyledDateSegment>
      <StyledAgeSegment
        ageColor={calculateAge(order.productionReceivedDate) >= 56 ? '#b32424' : '#d1d1d1'}
      >
        {calculateAge(order.productionReceivedDate)}
      </StyledAgeSegment>
      <StyledDateSegment>{convertDate(order.shipByDate)}</StyledDateSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledFiberglassSegment>01/01/00</StyledFiberglassSegment>
      <StyledFiberglassSegment>Garrett</StyledFiberglassSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledFiberglassSegment>01/01/00</StyledFiberglassSegment>
      <StyledFiberglassSegment>Garrett</StyledFiberglassSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledHardwareSegment>01/01/00</StyledHardwareSegment>
      <StyledHardwareSegment>01/01/00</StyledHardwareSegment>
      <StyledHardwareSegment>James</StyledHardwareSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledHardwareSegment>01/01/00</StyledHardwareSegment>
      <StyledHardwareSegment>James</StyledHardwareSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledTrimSegment>01/01/00</StyledTrimSegment>
      <StyledTrimSegment>01/01/00</StyledTrimSegment>
      <StyledTrimSegment>Marcos</StyledTrimSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledTrimSegment>01/01/00</StyledTrimSegment>
      <StyledTrimSegment>Marcos</StyledTrimSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledHardwareSegment>01/01/00</StyledHardwareSegment>
      <StyledHardwareSegment>01/01/00</StyledHardwareSegment>
      <StyledHardwareSegment>James</StyledHardwareSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledHardwareSegment>01/01/00</StyledHardwareSegment>
      <StyledHardwareSegment>James</StyledHardwareSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledInteriorsSegment>01/01/00</StyledInteriorsSegment>
      <StyledInteriorsSegment>01/01/00</StyledInteriorsSegment>
      <StyledInteriorsSegment>Hannah</StyledInteriorsSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledInteriorsSegment>01/01/00</StyledInteriorsSegment>
      <StyledInteriorsSegment>Hannah</StyledInteriorsSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledTrimSegment>01/01/00</StyledTrimSegment>
      <StyledTrimSegment>01/01/00</StyledTrimSegment>
      <StyledTrimSegment>Marcos</StyledTrimSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledTrimSegment>01/01/00</StyledTrimSegment>
      <StyledTrimSegment>Marcos</StyledTrimSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledShippingSegment>01/01/00</StyledShippingSegment>
      <StyledShippingSegment>01/01/00</StyledShippingSegment>
      <StyledShippingSegment>Molly</StyledShippingSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledShippingSegment>01/01/00</StyledShippingSegment>
      <StyledLastSegment>Molly</StyledLastSegment>
    </StyledOrderItem>
  )
}

export default OrderItemInClosed

const StyledOrderItem = styled.tr`
  position: relative;
  background-color: #ffffff;
  border-top: 2px solid #dddddd;
  border-bottom: 2px solid #dddddd;
  font-weight: bold;
  color: ${props => props.expediteColor};
  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  &:hover > td {
    border-right: 1px solid #000000;
    border-top: 2px solid #000000;
    border-bottom: 2px solid #000000;
  }
`

const StyledActionsSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
`

const StyledCheckbox = styled.input`
  display: inline-block;  
  margin: 0 2px;
`

const StyledActionButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
`

const StyledEditIcon = styled(MdOutlineEdit)`
  display: inline-block;  
  margin: 0 2px;
  color: #edb72f;
`

const StyledDeleteIcon = styled(MdDelete)`
  display: inline-block;
  margin: 0 2px;
  color: #f51f14;
`

const StyledOrderSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: ${props => props.marigoldColor};
`

const StyledDateSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: #d1d1d1;
`

const StyledAgeSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: ${props => props.ageColor};
`

const StyledModelCodeSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  white-space:nowrap;
  background-color: ${props => props.marigoldColor};
`

const StyledFiberglassSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: #ebc7ef;
`

const StyledHardwareSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: #c6e7c8;
`

const StyledTrimSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: #f7819f;
`

const StyledInteriorsSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: #b9ddfc;
`

const StyledShippingSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: #ffe1af;
`

const StyledLastSegment = styled.td`
  padding: 12px 15px;
  background-color: #ffe1af;
`

const StyledSlashSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  color: #ffffff;
  background-color: #2f3030;
`
