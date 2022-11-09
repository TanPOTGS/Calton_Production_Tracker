import {
  useState
} from 'react'
import Timer from '../Timer/Timer';
import styled from 'styled-components';

function TrimTasks(props) {
  const [timerVisibility, setTimerVisibility] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');

  const {
    orderData
  } = props

  const handleTaskSelection = (visibility, task) => {
    setTimerVisibility(visibility)
    setSelectedTask(task)
  }

  return (
    <StyledTrimTasksContainer>
      {timerVisibility ? (
          <Timer
            handleTaskSelection={handleTaskSelection}
            selectedTask={selectedTask}
            orderData={orderData}
          />
        ) : (
        <StyledButtonGrid>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task1")}>Inspection After Hardware</StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task2")}>Cut Top Trim</StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task3")}>Cut Bottom Trim</StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task4")}>Dry Fit Before Interiors</StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task5")}>Inspection After Interiors</StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task6")}>Fabric Trim And Sanding Process</StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task7")}>Gluing Process</StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task8")}>Final Cleaning</StyledTaskButton>
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

const StyledTaskButton = styled.button`
  font-size: 1.2rem;
  font-weight: 700;
  padding: 5px;
`