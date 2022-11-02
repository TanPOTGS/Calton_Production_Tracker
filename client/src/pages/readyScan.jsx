import {
  useEffect,
  useRef
} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import {
  getOrder,
  reset
} from '../features/orders/orderSlice';
import Spinner from '../components/Spinner/Spinner';
import styled from 'styled-components';

function ReadyScan() {

  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)

  const {
    orders,
    isLoading,
    isError,
    message
  } = useSelector((state) => state.orders)

  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);
  
  let barcode = '';
  let interval;

  const handleBarcode = (e) => {
    if(interval) {
      clearInterval(interval)
    }
    if(e.code === 'Enter') {
      if(barcode) {
        dispatch(getOrder(barcode))
        // console.log(barcode)
      }
      barcode = ''
      return
    }

    barcode += e.key

    interval = setInterval(() => barcode = '', 20)
  }

  if (isLoading) {
    return <Spinner />
  }


  return (
    <StyledScanViewContainer ref={ref} tabIndex={-1} onKeyDown={handleBarcode}>
      {orders.length > 0 ? (
        <StyledOrderDataDisplay >
          <StyledWcNumberDisplay>{orders[0].wcNumber}</StyledWcNumberDisplay>
          <StyledModelCodeDisplay>{orders[0].modelCode}</StyledModelCodeDisplay>
          <StyledRalNumberDisplay>RAL: {orders[0].ralNumber}</StyledRalNumberDisplay>
        </StyledOrderDataDisplay>
      ) : (
        <StyledPrompt>*Please Scan A Case*</StyledPrompt>
      )}
    </StyledScanViewContainer>
  )
}

export default ReadyScan

const StyledScanViewContainer = styled.div`
  height: 100%;
  width: 100%;
`

const StyledOrderDataDisplay = styled.div`

`

const StyledPrompt = styled.h1`
  color: #ffffff;
`

const StyledWcNumberDisplay = styled.h1`
  color: #ffffff;
`

const StyledModelCodeDisplay = styled.h1`
  color: #ffffff;
`

const StyledRalNumberDisplay = styled.h1`
  color: #ffffff;
`
