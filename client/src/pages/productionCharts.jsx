import {
  useSelector
} from 'react-redux'
import DashboardGauge from '../components/DashboardGauge/DashboardGauge'
import DashboardNumber from '../components/DashboardNumber/DashboardNumber';
import DashboardDepartmentCount from '../components/DashboardDepartmentCount/DashboardDepartmentCount'
import styled from 'styled-components';

function ProductionCharts() {
  const { user } = useSelector((state) => state.auth)

  return (
    <StyledChartsContainer>
      <StyledWelcomeContainer>
        <h1>Welcome to the Prodcution Dashboard, {user && user.name}</h1>
      </StyledWelcomeContainer>
      <StyledGaugesContainer>
        <DashboardGauge 
          gaugeTitle={"Partner Gearbox Sales"}
          startingNumber={0}
          endingNumber={2}
          data={0}
        />
        <DashboardGauge 
          gaugeTitle={"Partner Case Sales"}
          startingNumber={0}
          endingNumber={21}
          data={18}
        />
        <DashboardGauge 
          gaugeTitle={"Direct Gearbox Sales"}
          startingNumber={0}
          endingNumber={14}
          data={10}
        />
        <DashboardGauge 
          gaugeTitle={"Direct Case Sales"}
          startingNumber={0}
          endingNumber={14}
          data={12}
        />
        <DashboardGauge 
          gaugeTitle={"Weekly Sales"}
          startingNumber={0}
          endingNumber={50}
          data={35}
        />
        <DashboardGauge 
          gaugeTitle={"Weekly Shipped"}
          startingNumber={0}
          endingNumber={50}
          data={48}
        />
        <DashboardNumber 
          numberTitle={"Cases In Production"}
          startingNumber={0}
          endingNumber={0}
          number={398}
        />
        {/* <StyledCountContainer>
          <DashboardDepartmentCount />
        </StyledCountContainer> */}
      </StyledGaugesContainer>
    </StyledChartsContainer>
  )
}

export default ProductionCharts

const StyledChartsContainer = styled.div`
  
`

const StyledWelcomeContainer = styled.section`
  background-color: #4a4a4a;
  color: #ffffff;
  padding: 10px;
  margin: 0 0 20px 0;
`

const StyledGaugesContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(4, 350px);
  justify-content: space-evenly;
`

const StyledCountContainer = styled.div`
  grid-column: span 4;
`