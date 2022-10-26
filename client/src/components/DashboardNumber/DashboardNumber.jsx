import styled from 'styled-components';

function DashboardNumber(props) {
  const {
    numberTitle,
    startingNumber,
    endingNumber,
    number
  } = props
  
  // let numberColor

  // if(number >= -90 && number <= 18) {
  //   //60% and under
  //   numberColor = "#c4170a"
  // } else if(number > 18 && number <= 36) {
  //   //70% and under
  //   numberColor = "#d65b09"
  // } else if(number > 36 && number <= 54) {
  //   //80% and under
  //   numberColor = "#d1ba0a"
  // } else if(number > 54 && number <= 72) {
  //   //90% and under
  //   numberColor = "#85e62c"
  // } else if(number > 72 && number <= 90) {
  //   //100% and under
  //   numberColor = "#14c41a"
  // }

  return (
    <StyledNumberContainer>
      <StyledNumberInfoTop>
        <StyledNumberTitle>{numberTitle}</StyledNumberTitle>
      </StyledNumberInfoTop>
      <StyledNumberBody>
        <StyledNumber>{number}</StyledNumber>
      </StyledNumberBody>
    </StyledNumberContainer>
  )
}

export default DashboardNumber

const StyledNumberContainer = styled.div`
  position: relative;
  border: 1px solid #4a4a4a;
  border-radius: 10px;
  background-color: #262b2e;
  width: 350px;
  height: 350px;
  overflow: hidden;
`

const StyledNumberInfoTop = styled.div`
  display: flex;
  padding: 10px 0;
  background-color: #5e6a73;
  width: 100%;
  height: 10%;
  justify-content: space-around;
  align-items: center;
`

const StyledNumberTitle = styled.p`
  color: #ffffff;
  font-size: 1.5rem;
`

const StyledNumberBody = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  align-items: center;
`

const StyledNumber = styled.p`
  font-size: 120px;
  font-weight: 700;
  color: #ffffff;
`
