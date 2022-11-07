import {
  useState
} from 'react'
import Timer from '../Timer/Timer';
import styled from 'styled-components';

function TrimTasks(props) {
  const [timerVisibility, setTimerVisibility] = useState(false);

  const {
    orderData
  } = props

  const handleTaskSelection = () => {
    setTimerVisibility(true)
  }

  return (
    <StyledTrimTasksContainer>
      {timerVisibility ? (
          <>
            <Timer />
            {/* <button onClick={() => setTimerVisibility(false)}>close</button> */}
          </>
        ) : (
        <StyledButtonGrid>
          <button onClick={handleTaskSelection}>Inspection After Hardware</button>
          <button onClick={handleTaskSelection}>Cut Top Trim</button>
          <button onClick={handleTaskSelection}>Cut Bottom Trim</button>
          <button onClick={handleTaskSelection}>Dry Fit Before Interiors</button>
          <button onClick={handleTaskSelection}>Inspection After Interiors</button>
          <button onClick={handleTaskSelection}>Fabric Trim And Sanding Process</button>
          <button onClick={handleTaskSelection}>Gluing Process</button>
          <button onClick={handleTaskSelection}>Final Cleaning</button>
        </StyledButtonGrid>
      )}
    </StyledTrimTasksContainer>
  )
}

export default TrimTasks

const StyledTrimTasksContainer = styled.div`
  height: 100%;
`

const StyledButtonGrid = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
`
