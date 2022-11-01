import {
  useState
} from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';

function ReadyScan() {
  const [barcodeData, setBarcodeData] = useState('')

  const {user} = useSelector((state) => state.auth)
  
  let barcode = '';
  let interval;

  const handleBarcode = (scannedCode) => {
    setBarcodeData(scannedCode)
  }

  document.addEventListener('keydown', (e) => {
    if(interval) {
      clearInterval(interval)
    }
    if(e.code === 'Enter') {
      if(barcode) {
        handleBarcode(barcode)
      }
      barcode = ''
      return
    }
    barcode += e.key.toString()
    interval = setInterval(() => barcode = '', 20)
  });

  return (
    <StyledLandingContainer>
      <StyledBarcodeDisplay>{barcodeData}</StyledBarcodeDisplay>
    </StyledLandingContainer>
  )
}

export default ReadyScan

const StyledLandingContainer = styled.div`
  height: 100%;
  width: 100%;
`

const StyledBarcodeDisplay = styled.h1`
  color: #ffffff;
`
