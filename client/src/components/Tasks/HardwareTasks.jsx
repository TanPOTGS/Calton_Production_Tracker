import styled from 'styled-components';

function HardwareTasks(props) {
  const {
    
  } = props

  return (
    <StyledHardwareTasksContainer>
      <button>Inspection After Hardware</button>
      <button>Cut Top Trim</button>
      <button>Cut Bottom Trim</button>
      <button>Dry Fit Before Interiors</button>
      <button>Inspection After Interiors</button>
      <button>Fabric Trim And Sanding Process</button>
      <button>Gluing Process</button>
      <button>Final Cleaning</button>
    </StyledHardwareTasksContainer>
  )
}

export default HardwareTasks

const StyledHardwareTasksContainer = styled.div`
  
`
