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
  updateOrder,
  resetOrders
} from '../../features/orders/orderSlice';
import Spinner from '../Spinner/Spinner'
import styled from 'styled-components';

function Timer(props) {
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
  // paused = 2

  const {
    ms,
    s,
    m,
    h
  } = timerData

  const {
    handleTaskSelection,
    selectedTask,
    orderData,
    disableTask
  } = props

  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  const {
    orders,
    isLoading,
    isError,
    message
  } = useSelector((state) => state.orders)

  // useEffect(() => {
  //   if(!user) {
  //     dispatch(reset())
  //     navigate('/login')
  //   }

  //   ref.current.focus();
  // }, [
  //   user,
  //   orders,
  //   navigate
  // ]);

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

  const pauseTimer = () => {
    clearInterval(timerInterval);
    setTimerStatus(2);
  }

  const submitTime = () => {
    let taskData = {
      _id: orderData._id,
      trimDepartment: {
        [selectedTask]: {
          isComplete: true,
          completionTime: `${timerData.h}:${timerData.m}:${timerData.s}:${timerData.ms}`,
          completedBy: user.name
        }
      }
    }
    clearInterval(timerInterval);
    dispatch(updateOrder(taskData))
    // console.log(taskData)
    disableTask(selectedTask)
    handleTaskSelection(false)
    setTimerStatus(0);
    setTimerData({ms:0, s:0, m:0, h:0})
  }

  if (isLoading) {
    return <Spinner />
  }


  return (
    <StyledTimerContainer>
      <StyledButtonContainer>
        {timerStatus === 0 ? (
          <>
            <StyledBackButton onClick={() => handleTaskSelection(false)}>Back To Tasks</StyledBackButton>
            <StyledStartButton onClick={startTimer}>Start</StyledStartButton>
          </>
        ) : (
          null
        )}
        {timerStatus === 1 ? (
          <>
            <StyledPauseButton onClick={pauseTimer}>Pause</StyledPauseButton>
            <StyledFinishedButton disabled>Finish</StyledFinishedButton>
          </>
        ) : (
          null
        )}
        {timerStatus === 2 ? (
          <>
            <StyledResumeButton onClick={startTimer}>Resume</StyledResumeButton>
            <StyledFinishedButton onClick={submitTime}>Finish</StyledFinishedButton>
          </>
        ) : (
          null
        )}
      </StyledButtonContainer>
      <StyledCounterContainer>
        <StyledCounter>
          <span>{h >= 0 && h <= 9 ? 0 : null}{h}</span>
          :
          <span>{m >= 0 && m <= 9 ? 0 : null}{m}</span>
          :
          <span>{s >= 0 && s <= 9 ? 0 : null}{s}</span>
        </StyledCounter>
      </StyledCounterContainer>
    </StyledTimerContainer>
  )
}

export default Timer

const StyledTimerContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(2, 1fr);
`

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledCounterContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledBackButton = styled.button`
  width: 200px;
  height: 100px;
  font-size: 2rem;
  margin: 0 10px 0 0;
  // background-color: #009879;
  // color: #ffffff;
`

const StyledStartButton = styled.button`
  width: 200px;
  height: 100px;
  font-size: 2rem;
  margin: 0 0 0 10px;
  background-color: #009879;
  color: #ffffff;
`

const StyledPauseButton = styled.button`
  width: 200px;
  height: 100px;
  font-size: 2rem;
  margin: 0 10px 0 0;
  background-color: #f0372e;
`

const StyledResumeButton = styled.button`
  width: 200px;
  height: 100px;
  font-size: 2rem;
  margin: 0 10px 0 0;
  background-color: #51e810;
`

const StyledFinishedButton = styled.button`
  width: 200px;
  height: 100px;
  font-size: 2rem;
  margin: 0 0 0 10px;
`

const StyledCounter = styled.p`
  font-size: 5rem;
  font-weight: 700;
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
`

const Sdiv5 = styled.div`
  background-color: purple;
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
