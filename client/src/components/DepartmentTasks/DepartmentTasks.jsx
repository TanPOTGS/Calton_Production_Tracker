import FiberglassTasks from '../Tasks/FiberglassTasks';
import HardwareTasks from '../Tasks/HardwareTasks';
import TrimTasks from '../Tasks/TrimTasks';
import InteriorsTasks from '../Tasks/InteriorsTasks';
import ShippingTasks from '../Tasks/ShippingTasks';
import styled from 'styled-components';

function DepartmentTasks(props) {
  const {
    department,
    orderData
  } = props

  const renderTasks = () => {
    switch (department) {
      case 'Fiberglass':
        return <FiberglassTasks orderData={orderData} />
      case 'Hardware':
        return <HardwareTasks orderData={orderData} />
      case 'Trim':
        return <TrimTasks orderData={orderData} />
      case 'Interiors':
        return <InteriorsTasks orderData={orderData} />
      case 'Shipping':
        return <ShippingTasks orderData={orderData} />
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
  height: 100%;
`
