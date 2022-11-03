import FiberglassTasks from '../Tasks/FiberglassTasks';
import HardwareTasks from '../Tasks/HardwareTasks';
import TrimTasks from '../Tasks/TrimTasks';
import InteriorsTasks from '../Tasks/InteriorsTasks';
import ShippingTasks from '../Tasks/ShippingTasks';
import styled from 'styled-components';

function DepartmentTasks(props) {
  const {
    department
  } = props

  const renderTasks = () => {
    switch (department) {
      case 'Fiberglass':
        return <FiberglassTasks />
      case 'Hardware':
        return <HardwareTasks />
      case 'Trim':
        return <TrimTasks />
      case 'Interiors':
        return <InteriorsTasks />
      case 'Shipping':
        return <ShippingTasks />
      default:
        console.log('default');
    }
  }

  return (
    <StyledTasksContainer>
      {renderTasks()}
    </StyledTasksContainer>
  )
}

export default DepartmentTasks

const StyledTasksContainer = styled.div`
  
`
