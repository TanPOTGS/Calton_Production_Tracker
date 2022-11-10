import {
  useState
} from 'react'
import {
  MdOutlineEdit,
  MdDelete
} from 'react-icons/md'
import styled from 'styled-components';

function OrderItemInReview(props) {
  const [isChecked, setCheckbox] = useState(false)

  const {
    order,
    toggleEditModal,
    toggleDeleteModal,
    handleOrderSelect,
    handleOrderNotesDisplay
  } = props

  let moldCode = '--'
  let secCode = '--'
  let efCode = '--'
  let gcCode = '--'
  let sOneCode = '--'
  let sTwoCode = '--'
  let sThreeCode = '--'
  let taperCode = '--'
  let baseDepthCode = '--'
  let hardwareCode = '--'
  let templateCode = '----'
  let ibCode = '--'
  let ivcCode = '--'
  let nameplateCode = '--'
  let caseCoverCode = '--'
  let shippingCode = '--'
  

  const re = /([-\w]{2})([-\w]{2})\/([-\w]{2})([-\w]{2})([-\w]{2})([-\w]{2})([-\w]{2})\/([-\w]{2})([-\w]{2})\/([-\w]{2})\/([-\w]{4})([-\w]{2})([-\w]{2})\/([-\w]{2})([-\w]{2})([-\w]{2})/i;
  const orderModelCode = order.modelCode;
  const reMatch = re.test(orderModelCode);

  if(reMatch) {
    const reGroups = orderModelCode.match(re)

    moldCode = reGroups[1]
    secCode = reGroups[2]
    efCode = reGroups[3]
    gcCode = reGroups[4]
    sOneCode = reGroups[5]
    sTwoCode = reGroups[6]
    sThreeCode = reGroups[7]
    taperCode = reGroups[8]
    baseDepthCode = reGroups[9]
    hardwareCode = reGroups[10]
    templateCode = reGroups[11]
    ibCode = reGroups[12]
    ivcCode = reGroups[13]
    nameplateCode = reGroups[14]
    caseCoverCode = reGroups[15]
    shippingCode = reGroups[16]
  } else {
    moldCode = ''
    secCode = ''
    efCode = ''
    gcCode = ''
    sOneCode = ''
    sTwoCode = ''
    sThreeCode = ''
    taperCode = ''
    baseDepthCode = ''
    hardwareCode = ''
    templateCode = ''
    ibCode = ''
    ivcCode = ''
    nameplateCode = ''
    caseCoverCode = ''
    shippingCode = ''
  }

  const convertDate = (date) => {
    if(date) {
      const convertedDate = new Date(date).toLocaleDateString('en-us', {timeZone: 'UTC'});

      return convertedDate
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

  let reviewStatusColor;

  if(order.reviewStatus === "Hold") {
    reviewStatusColor = 'red'
  } else if(order.reviewStatus === "Pending") {
    reviewStatusColor = 'yellow'
  } else if(order.reviewStatus === "Ready") {
    reviewStatusColor = 'green'
  }

  return (
    <StyledOrderItem onClick={() => handleOrderNotesDisplay(order)} expediteColor={order.expedite ? 'red' : '#000000'}>
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
      <StyledReviewStatusSegment backgroundStatusColor={reviewStatusColor}>{order.reviewStatus}</StyledReviewStatusSegment>
      <StyledOrderSegment marigoldColor={order.isMarigold ? '#ffed00' : 'transparent'}>{convertDate(order.submitDate)}</StyledOrderSegment>
      <StyledOrderSegment marigoldColor={order.isMarigold ? '#ffed00' : 'transparent'}>{convertDate(order.reviewDate)}</StyledOrderSegment>
      <StyledOrderSegment marigoldColor={order.isMarigold ? '#ffed00' : 'transparent'}>{convertDate(order.eligibleForProductionDate)}</StyledOrderSegment>
      <StyledOrderSegment marigoldColor={order.isMarigold ? '#ffed00' : 'transparent'}>{order.wcNumber}</StyledOrderSegment>
      <StyledModelCodeSegment marigoldColor={order.isMarigold ? '#ffed00' : 'transparent'}>{order.modelCode}</StyledModelCodeSegment>
      <StyledOrderSegment marigoldColor={order.isMarigold ? '#ffed00' : 'transparent'}>{order.customer}</StyledOrderSegment>
      <StyledOrderSegment marigoldColor={order.isMarigold ? '#ffed00' : 'transparent'}>{order.caltonRep}</StyledOrderSegment>
      <StyledFiberglassOneSegment>{moldCode}</StyledFiberglassOneSegment>
      <StyledFiberglassOneSegment>{secCode}</StyledFiberglassOneSegment>
      <StyledFiberglassOneSegment>{order.ralNumber}</StyledFiberglassOneSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledFiberglassTwoSegment>{efCode}</StyledFiberglassTwoSegment>
      <StyledFiberglassTwoSegment>{gcCode}</StyledFiberglassTwoSegment>
      <StyledFiberglassTwoSegment>{sOneCode}</StyledFiberglassTwoSegment>
      <StyledFiberglassTwoSegment>{sTwoCode}</StyledFiberglassTwoSegment>
      <StyledFiberglassTwoSegment>{sThreeCode}</StyledFiberglassTwoSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledFiberglassOneSegment>{taperCode}</StyledFiberglassOneSegment>
      <StyledFiberglassOneSegment>{baseDepthCode}</StyledFiberglassOneSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledHardwareSegment>{hardwareCode}</StyledHardwareSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledInteriorsSegment>{templateCode}</StyledInteriorsSegment>
      <StyledInteriorsSegment>{ibCode}</StyledInteriorsSegment>
      <StyledInteriorsSegment>{ivcCode}</StyledInteriorsSegment>
      <StyledSlashSegment>/</StyledSlashSegment>
      <StyledShippingSegment>{nameplateCode}</StyledShippingSegment>
      <StyledShippingSegment>{caseCoverCode}</StyledShippingSegment>
      <StyledShippingSegment>{shippingCode}</StyledShippingSegment>
      <StyledBillingSegment>{order.poNumber}</StyledBillingSegment>
      <StyledBillingSegment>{order.pricing}</StyledBillingSegment>
      <StyledBillingSegment>{order.serialNumber}</StyledBillingSegment>
      <StyledBillingSegment>{convertDate(order.dateShipped)}</StyledBillingSegment>
      <StyledBillingSegment>{order.trackingNumber}</StyledBillingSegment>
      <StyledBillingSegment>{order.invoiceNumber}</StyledBillingSegment>
      <StyledBillingSegment>{convertDate(order.invoiceDate)}</StyledBillingSegment>
      <StyledBillingSegment>{order.invoiceSentVia}</StyledBillingSegment>
      <StyledBillingSegment>{convertDate(order.paymentDueDate)}</StyledBillingSegment>
      <StyledBillingSegment>{convertDate(order.paymentReceivedDate)}</StyledBillingSegment>
      <StyledLastSegment>{order.orderStatus}</StyledLastSegment>
    </StyledOrderItem>
  )
}

export default OrderItemInReview

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

const StyledOrderSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: ${props => props.marigoldColor};
`

const StyledReviewStatusSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  color: #000000;
  background-color: ${props => props.backgroundStatusColor};
`

const StyledModelCodeSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  white-space:nowrap;
  background-color: ${props => props.marigoldColor};
`

const StyledFiberglassOneSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: #ebc7ef;
`

const StyledFiberglassTwoSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: #f4e4f5;
`

const StyledHardwareSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: #c6e7c8;
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

const StyledSlashSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  color: #ffffff;
  background-color: #2f3030;
`

const StyledActionsSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
`

const StyledBillingSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  background-color: #feff85;
`

const StyledLastSegment = styled.td`
  padding: 12px 15px;
  background-color: #feff85;
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