import styled from 'styled-components';

function DashboardDepartmentCount(props) {
  // const {
  //   numberTitle,
  //   startingNumber,
  //   endingNumber,
  //   number
  // } = props

  return (
    <StyledCountContainer>
      <StyledCountInfoContainer>
        <StyledCountTitle>In Queue / Active Cases</StyledCountTitle>
      </StyledCountInfoContainer>
      <StyledDepartmentsContainer>
        <StyledDepartmentBody>
          <StyledDepartmentHeader>
            <p>Fiberglass</p>
          </StyledDepartmentHeader>
          <h1>data</h1>
        </StyledDepartmentBody>
        <StyledDepartmentBody>
          <StyledDepartmentHeader>
            <p>Hardware 1</p>
          </StyledDepartmentHeader>
          <h1>data</h1>
        </StyledDepartmentBody>
        <StyledDepartmentBody>
          <StyledDepartmentHeader>
            <p>Trim 1</p>
          </StyledDepartmentHeader>
          <h1>data</h1>
        </StyledDepartmentBody>
        <StyledDepartmentBody>
          <StyledDepartmentHeader>
            <p>Hardware 2</p>
          </StyledDepartmentHeader>
          <h1>data</h1>
        </StyledDepartmentBody>
        <StyledDepartmentBody>
          <StyledDepartmentHeader>
            <p>Interiors</p>
          </StyledDepartmentHeader>
          <h1>data</h1>
        </StyledDepartmentBody>
        <StyledDepartmentBody>
          <StyledDepartmentHeader>
            <p>Trim 2</p>
          </StyledDepartmentHeader>
          <h1>data</h1>
        </StyledDepartmentBody>
        <StyledDepartmentBody>
          <StyledDepartmentHeader>
            <p>Shipping</p>
          </StyledDepartmentHeader>
          <h1>data</h1>
        </StyledDepartmentBody>
      </StyledDepartmentsContainer>
    </StyledCountContainer>
  )
}

export default DashboardDepartmentCount

const StyledCountContainer = styled.div`
  position: relative;
  border: 1px solid #4a4a4a;
  border-radius: 10px;
  background-color: #262b2e;
  // width: 350px;
  height: 350px;
  overflow: hidden;
`

const StyledCountInfoContainer = styled.div`
  display: flex;
  padding: 10px 0;
  background-color: #5e6a73;
  width: 100%;
  height: 10%;
  justify-content: space-around;
  align-items: center;
`

const StyledCountTitle = styled.p`
  color: #ffffff;
  font-size: 1.5rem;
`

const StyledDepartmentsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const StyledDepartmentBody = styled.div`
  border: 1px solid #afafaf;
  width: 100%;
  // height: 100%;
`

const StyledDepartmentHeader = styled.div`
  color: #ffffff;
  background-color: #5e6a73;
  text-align: center;
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
