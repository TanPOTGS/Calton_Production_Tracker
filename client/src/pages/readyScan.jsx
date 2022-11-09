import {
  useEffect,
  useRef
} from 'react'
import {
  useNavigate
} from 'react-router-dom'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import {
  getOrder,
  resetOrders
} from '../features/orders/orderSlice';
import DepartmentTasks from '../components/DepartmentTasks/DepartmentTasks';
import Spinner from '../components/Spinner/Spinner';
import styled from 'styled-components';


function ReadyScan() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  const {
    orders,
    isLoading,
    isError,
    message
  } = useSelector((state) => state.orders)

  const ref = useRef(null);

  useEffect(() => {
    if(!user) {
      dispatch(resetOrders())
      navigate('/login')
    }

    ref.current.focus();
  }, [
    user,
    orders,
    navigate,
    dispatch
  ]);
  
  let barcode = '';
  let barcodeInterval;

  const handleBarcode = (e) => {
    if(barcodeInterval) {
      clearInterval(barcodeInterval)
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

    barcodeInterval = setInterval(() => barcode = '', 20)
  }

  if (isLoading) {
    return <Spinner />
  }


  return (
    <StyledScanViewContainer ref={ref} tabIndex={-1} onKeyDown={handleBarcode}>
      {orders.length > 0 ? (
        <StyledGrid >
          <StyledOrderDataContainer>
            <StyledWcNumberDisplay>
              <StyledWcNumberTitle>WC Number:</StyledWcNumberTitle>
              <StyledWcNumberBody>{orders[0].wcNumber}</StyledWcNumberBody>
            </StyledWcNumberDisplay>
            <StyledModelCodeDisplay>
              <StyledModelCodeTitle>Model Code:</StyledModelCodeTitle>
              <StyledModelCodeBody>{orders[0].modelCode}</StyledModelCodeBody>
            </StyledModelCodeDisplay>
            <StyledRalNumberDisplay>
              <StyledRalNumberTitle>RAL:</StyledRalNumberTitle>
              <StyledRalNumberBody>{orders[0].ralNumber}</StyledRalNumberBody>
            </StyledRalNumberDisplay>
          </StyledOrderDataContainer>
          <StyledOrderNotesContainer>
            <StyledOrderNotesHeader>
              <StyledOrderNotesTitle>Notes About Build:</StyledOrderNotesTitle>
            </StyledOrderNotesHeader>
            <StyledOrderNotesDisplay>
              <StyledOrderNotesBody>
                {orders[0].orderNote}
              </StyledOrderNotesBody>
            </StyledOrderNotesDisplay>
          </StyledOrderNotesContainer>
          <StyledTasksView>
            {user && <DepartmentTasks 
              department={user.department}
              orderData={orders[0]}
            />}
          </StyledTasksView>
        </StyledGrid>
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

const StyledGrid = styled.div`
  display: grid;
  gap: .5rem;
  height: 100%;
  background-color: #000000;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
`

const StyledOrderDataContainer = styled.div`
  background-color: #4a4a4a;
  grid-column: span 4;
`

const StyledWcNumberDisplay = styled.div`
  padding: 10px;
`

const StyledWcNumberTitle = styled.h2`
  color: #009879;
`

const StyledWcNumberBody = styled.h1`
  color: #ffffff;
`

const StyledModelCodeDisplay = styled.div`
  padding: 10px;
`

const StyledModelCodeTitle = styled.h2`
  color: #009879;
`

const StyledModelCodeBody = styled.h1`
  color: #ffffff;
`

const StyledRalNumberDisplay = styled.div`
  padding: 10px;
`

const StyledRalNumberTitle = styled.h2`
  color: #009879;
`

const StyledRalNumberBody = styled.h1`
  color: #fff
`

const StyledOrderNotesContainer = styled.div`
  background-color: #4a4a4a;
  grid-column: span 2;
  overflow: auto;
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

const StyledOrderNotesHeader = styled.div`
  padding: 10px;
`

const StyledOrderNotesTitle = styled.h1`
  color: #009879;
`

const StyledOrderNotesDisplay = styled.div`
  padding: 10px;
`

const StyledOrderNotesBody = styled.p`
  color: #ffffff;
  white-space: pre-wrap;
  font-weight: 700;
  font-size: 1.3rem;
  overflow: auto;
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

const StyledTasksView = styled.div`
  background-color: #4a4a4a;
  grid-column: span 6;
`

const StyledPrompt = styled.p`
  background-color: #000000;
  color: #ffffff;
  border-radius: 10px;
  border: 5px solid #009879;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 70px;
`
