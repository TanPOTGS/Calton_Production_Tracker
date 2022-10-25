import {
  useSelector
} from 'react-redux'
import DashboardGauge from '../components/DashboardGauge/DashboardGauge'
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
          endingNumber={50}
          currentDeg={0}
        />
        <DashboardGauge 
          gaugeTitle={"Partner Case Sales"}
          startingNumber={0}
          endingNumber={50}
          currentDeg={70}
        />
        <DashboardGauge 
          gaugeTitle={"Direct Gearbox Sales"}
          startingNumber={0}
          endingNumber={50}
          currentDeg={25}
        />
        <DashboardGauge 
          gaugeTitle={"Direct Case Sales"}
          startingNumber={0}
          endingNumber={50}
          currentDeg={44}
        />
        <DashboardGauge 
          gaugeTitle={"Partner Gearbox Sales"}
          startingNumber={0}
          endingNumber={50}
          currentDeg={90}
        />
        <DashboardGauge 
          gaugeTitle={"Partner Case Sales"}
          startingNumber={0}
          endingNumber={50}
          currentDeg={70}
        />
        <DashboardGauge 
          gaugeTitle={"Direct Case Sales"}
          startingNumber={0}
          endingNumber={50}
          currentDeg={-20}
        />
        <DashboardGauge 
          gaugeTitle={"Direct Case Sales"}
          startingNumber={0}
          endingNumber={50}
          currentDeg={44}
        />
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
`

const StyledGaugesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-evenly;
  height: 100%;
  width: 100%;
`