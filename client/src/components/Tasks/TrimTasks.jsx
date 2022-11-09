import {
  useState
} from 'react'
import Timer from '../Timer/Timer';
import styled from 'styled-components';

function TrimTasks(props) {
  const {
    orderData
  } = props

  const [timerVisibility, setTimerVisibility] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');
  const [toggleTask, setToggleTask] = useState({
    task1: orderData.trimDepartment.task1.isComplete,
    task2: orderData.trimDepartment.task2.isComplete,
    task3: orderData.trimDepartment.task3.isComplete,
    task4: orderData.trimDepartment.task4.isComplete,
    task5: orderData.trimDepartment.task5.isComplete,
    task6: orderData.trimDepartment.task6.isComplete,
    task7: orderData.trimDepartment.task7.isComplete,
    task8: orderData.trimDepartment.task8.isComplete
  });

  const {
    task1,
    task2,
    task3,
    task4,
    task5,
    task6,
    task7,
    task8
  } = toggleTask

  const handleTaskSelection = (visibility, task) => {
    setTimerVisibility(visibility)
    setSelectedTask(task)
  }

  const disableTask = (task) => {
    setToggleTask((prevState) => ({
      ...prevState,
      [task]: true
    }))
  }

  return (
    <StyledTrimTasksContainer>
      {timerVisibility ? (
          <Timer
            handleTaskSelection={handleTaskSelection}
            selectedTask={selectedTask}
            orderData={orderData}
            disableTask={disableTask}
          />
        ) : (
        <StyledButtonGrid>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task1")} disabled={task1}>
            Inspection After Hardware {task1 ? "(COMPLETED)" : null}
          </StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task2")} disabled={task2}>
            Cut Top Trim {task2 ? "(COMPLETED)" : null}
          </StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task3")} disabled={task3}>
            Cut Bottom Trim {task3 ? "(COMPLETED)" : null}
          </StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task4")} disabled={task4}>
            Dry Fit Before Interiors {task4 ? "(COMPLETED)" : null}
          </StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task5")} disabled={task5}>
            Inspection After Interiors {task5 ? "(COMPLETED)" : null}
          </StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task6")} disabled={task6}>
            Fabric Trim And Sanding Process {task6 ? "(COMPLETED)" : null}
          </StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task7")} disabled={task7}>
            Gluing Process {task7 ? "(COMPLETED)" : null}
          </StyledTaskButton>
          <StyledTaskButton onClick={() => handleTaskSelection(true, "task8")} disabled={task8}>
            Final Cleaning {task8 ? "(COMPLETED)" : null}
          </StyledTaskButton>
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