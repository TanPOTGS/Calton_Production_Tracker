import styled from 'styled-components';

function DashboardGauge(props) {
  const {
    gaugeTitle,
    startingNumber,
    endingNumber,
    data
  } = props

  // This gets raw percent of acutal number over goal number
  const rawPercent = (data / endingNumber) * 100;
  // This caps the percent at 2 decimal places
  const roundedPercent = rawPercent.toFixed(2);
  // This turns the percent into a number to be used for multiplication
  const percentToDec = roundedPercent / 100;
  // This turns the percent into a degree between -90 and 90
  const percentToDeg = (percentToDec * 180) - 90;
  // This rounds the degree down
  const roundedPercentToDeg = Math.floor(percentToDeg);

  let gaugeDeg

  if(roundedPercentToDeg < -90) {
    gaugeDeg = '-90deg'

  } else if(roundedPercentToDeg > 90) {
    gaugeDeg = '90deg'
  } else {
    gaugeDeg = `${roundedPercentToDeg}deg`
  }
  
  let gaugeColor

  if(roundedPercent <= 60) {
    //60% and under
    gaugeColor = "#c4170a"

  } else if(roundedPercent <= 70) {
    //70% and under
    gaugeColor = "#d65b09"

  } else if(roundedPercent <= 80) {
    //80% and under
    gaugeColor = "#d1ba0a"

  } else if(roundedPercent <= 90) {
    //90% and under
    gaugeColor = "#85e62c"

  } else if(roundedPercent > 90) {
    //100% and under
    gaugeColor = "#14c41a"

  }

  return (
    <StyledGaugeContainer>
      <StyledGaugeInfoTop>
        <StyledGaugeTitle>{gaugeTitle}</StyledGaugeTitle>
      </StyledGaugeInfoTop>
      <StyledGauge>
        <StyledGaugeBody>
          <StyledProgressBar gaugeDeg={gaugeDeg} gaugeColor={gaugeColor}></StyledProgressBar>
          <StyledNeedle gaugeDeg={gaugeDeg}></StyledNeedle>
          <StyledNeedleBase></StyledNeedleBase>
        </StyledGaugeBody>
      </StyledGauge>
      <StyledGaugeInfoBottom>
        <StyledGaugeRange>{startingNumber}</StyledGaugeRange>
        <StyledGaugeActualCount textColor={gaugeColor}>{data}</StyledGaugeActualCount>
        <StyledGaugeRange>{endingNumber}</StyledGaugeRange>
      </StyledGaugeInfoBottom>
    </StyledGaugeContainer>
  )
}

export default DashboardGauge

const StyledGaugeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: 1px solid #4a4a4a;
  border-radius: 10px;
  background-color: #262b2e;
  width: 350px;
  height: 350px;
  // margin: 10px;
  overflow: hidden;
`

const StyledGauge = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 10px;
  align-self: center;
`

const StyledGaugeBody = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #000000;
  // border-bottom: 4px solid #000000;
  border-radius: 50%;
  outline: 4px solid #000000;
  outline-offset: 5px;
  overflow: hidden;
  background-color: #afafaf;
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    width: 70%;
    height: 70%;
    background-color: #ffffff;
    z-index: 100;
    border-radius: 50%;
  }
  &:after {
    position: absolute;
    top: 50%;
    content: '';
    width: 100%;
    height: 50%;
    background-color: #ffffff;
  }
`

const StyledProgressBar = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: ${props => props.gaugeColor};
  transform: rotate(${props => props.gaugeDeg});
  transform-origin: center right;
  transition: rotate 0.2s ease-in-out;
`

const StyledNeedle = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  background-color: #000000;
  clip-path: polygon(50% 0, 50% 0, 52% 100%, 48% 100%);
  z-index: 101;
  transform: rotate(${props => props.gaugeDeg});
  transform-origin: bottom center;
`

const StyledNeedleBase = styled.div`
  position: absolute;
  width: 15%;
  height: 15%;
  background-color: #000000;
  z-index: 102;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  top: 50%;
  left: 50%;
`

const StyledGaugeInfoTop = styled.div`
  display: flex;
  padding: 10px 0;
  background-color: #5e6a73;
  width: 100%;
  height: 10%;
  justify-content: space-around;
  align-items: center;
`

const StyledGaugeInfoBottom = styled.div`
  display: flex;
  padding: 10px 0;
  background-color: #5e6a73;
  width: 100%;
  height: 10%;
  justify-content: space-around;
  align-items: center;
`

const StyledGaugeTitle = styled.p`
  color: #ffffff;
  font-size: 1.5rem;
`

const StyledGaugeRange = styled.p`
  color: #ffffff;
  padding: 0 20px;
  font-size: 1.5rem;
`

const StyledGaugeActualCount = styled.p`
  color: ${props => props.textColor};
  padding: 0 20px;
  border: 2px solid #afafaf;
  font-size: 1.5rem;
  font-weight: 700;
  background-color: #000000;
`