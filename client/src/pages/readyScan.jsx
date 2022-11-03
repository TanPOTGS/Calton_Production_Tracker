import {
  useState,
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
  reset
} from '../features/orders/orderSlice';
import DepartmentTasks from '../components/DepartmentTasks/DepartmentTasks';
import Spinner from '../components/Spinner/Spinner';
import styled from 'styled-components';

function ReadyScan() {
  const [timerData, setTimerData] = useState({
    ms: 0,
    s: 0,
    m: 0,
    h: 0
  })
  const [timerInterval, setTimerInterval] = useState();
  const [timerStatus, setTimerStatus] = useState(0);
  // Not started = 0
  // started = 1
  // stopped = 2

  const {
    ms,
    s,
    m,
    h
  } = timerData

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
      dispatch(reset())
      navigate('/login')
    }

    ref.current.focus();
  }, [
    user,
    orders,
    navigate
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

  let updatedMs = ms;
  let updatedS = s;
  let updatedM = m;
  let updatedH = h;

  const handleCount = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTimerData({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  }

  const startTimer = () => {
    handleCount();
    setTimerStatus(1);
    setTimerInterval(setInterval(handleCount, 10));
  }

  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimerStatus(2);
  }

  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimerStatus(0);
    setTimerData({ms:0, s:0, m:0, h:0})
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
          <StyledOrderNoteDisplay>Notes About Build: {orders[0].orderNote}</StyledOrderNoteDisplay>
          <h2>Pick a task to start:</h2>
          {user && <DepartmentTasks 
            department={user.department}
          />}
          <div>
            <p>
              <span>{h}</span>
              :
              <span>{m}</span>
              :
              <span>{s}</span>
              :
              <span>{ms}</span>
            </p>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
          </div>
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

const StyledWcNumberDisplay = styled.h1`
  color: #ffffff;
`

const StyledModelCodeDisplay = styled.h1`
  color: #ffffff;
`

const StyledRalNumberDisplay = styled.h1`
  color: #ffffff;
`

const StyledOrderNoteDisplay = styled.p`
  color: #ffffff;
  white-space: pre-wrap;
`
