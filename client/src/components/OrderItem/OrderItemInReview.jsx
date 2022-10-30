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
    handleOrderSelect
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
  }

  const convertDate = (date) => {
    const convertedDate = new Date(date).toLocaleDateString('en-us', {timeZone: 'UTC'});

    return convertedDate
  }

  const toggleCheckbox = () => {
    setCheckbox(!isChecked)
    handleOrderSelect(isChecked, order._id)
  }

  return (
    <StyledOrderItem>
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
      <StyledOrderSegment>{order.reviewStatus}</StyledOrderSegment>
      <StyledOrderSegment>{convertDate(order.submitDate)}</StyledOrderSegment>
      <StyledOrderSegment>{convertDate(order.reviewDate)}</StyledOrderSegment>
      <StyledOrderSegment>{convertDate(order.eligibleForProductionDate)}</StyledOrderSegment>
      <StyledOrderSegment>{order.wcNumber}</StyledOrderSegment>
      <StyledModelCodeSegment>{order.modelCode}</StyledModelCodeSegment>
      <StyledOrderSegment>{order.customer}</StyledOrderSegment>
      <StyledOrderSegment>{order.caltonRep}</StyledOrderSegment>
      <StyledFiberglassOneSegment>{moldCode}</StyledFiberglassOneSegment>
      <StyledFiberglassOneSegment>{secCode}</StyledFiberglassOneSegment>
      <StyledFiberglassOneSegment>N/A</StyledFiberglassOneSegment>
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
      <StyledLastSegment>{shippingCode}</StyledLastSegment>
    </StyledOrderItem>
  )
}

export default OrderItemInReview

const StyledOrderItem = styled.tr`
  background-color: #ffffff;
  border-bottom: 1px solid #dddddd;
  font-weight: bold;
  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  &:hover > td {
    background-color: rgba(150, 153, 153, .3);
  }
`

const StyledOrderSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
`

const StyledModelCodeSegment = styled.td`
  padding: 12px 15px;
  border-right: 1px solid #afafaf;
  white-space:nowrap;
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

const StyledLastSegment = styled.td`
  padding: 12px 15px;
  background-color: #ffe1af;
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