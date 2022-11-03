import styled from 'styled-components';

function ShippingTasks(props) {
  const {
    
  } = props

  return (
    <StyledShippingTasksContainer>
      <button>Inspection After Hardware</button>
      <button>Cut Top Trim</button>
      <button>Cut Bottom Trim</button>
      <button>Dry Fit Before Interiors</button>
      <button>Inspection After Interiors</button>
      <button>Fabric Trim And Sanding Process</button>
      <button>Gluing Process</button>
      <button>Final Cleaning</button>
    </StyledShippingTasksContainer>
  )
}

export default ShippingTasks

const StyledShippingTasksContainer = styled.div`
  
`
