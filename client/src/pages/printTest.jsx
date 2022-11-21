import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Barcode from 'react-barcode';
import styled from 'styled-components';

function PrintTest() {
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  const barcodeConfig = {
    width: 2,
    height: 35,
    marginTop: 25,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 20,
    textMargin: 0
  }

  return (
    <StyledTestContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7500-0"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7501-0"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7502-1"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7502-2"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7500-0"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7501-0"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7502-1"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7502-2"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7500-0"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7501-0"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7502-1"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7502-2"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7500-0"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7501-0"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7502-1"/>
      </StyledBarcodeContainer>
      <StyledBarcodeContainer>
        <Barcode {...barcodeConfig} value="7502-2"/>
      </StyledBarcodeContainer>
    </StyledTestContainer>
  )
}

export default PrintTest

const StyledTestContainer = styled.div`
  @media print {
    text-align: center;
    // justify-self: center;
  }
`

const StyledBarcodeContainer = styled.div`
  display: block;
  @media print {
    display: block;
  }
`
