import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  useState
} from 'react';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import styled from 'styled-components';
import Landing from './pages/landing';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import OrderReview from './pages/orderReview';
import OrdersHold from './pages/ordersHold';
import OrdersClosed from './pages/ordersClosed';
import Production from './pages/production';
import ProductionCharts from './pages/productionCharts';
import AdminCharts from './pages/adminCharts';
import ReadyScan from './pages/readyScan';
import PrintTest from './pages/printTest';
import Header from './components/Header/Header';

function App() {
  const [modalData, setModal] = useState({
    displayModal: false,
    modalType: '',
    orderDataForModal: {}
  })

  const {
    displayModal,
    modalType,
    orderDataForModal
  } = modalData

  const toggleCreateOrderModal = () => setModal({
    displayModal: !displayModal,
    modalType: 'createOrderForm'
  })

  const toggleDeleteOrderModal = (orderDataForModal) => setModal({
    displayModal: !displayModal,
    modalType: 'deleteOrderForm',
    orderDataForModal: orderDataForModal
  })

  const toggleEditOrderModal = (orderDataForModal) => setModal({
    displayModal: !displayModal,
    modalType: 'editOrderForm',
    orderDataForModal: orderDataForModal
  })

  const toggleEditContactInfoModal = (orderDataForModal) => setModal({
    displayModal: !displayModal,
    modalType: 'editContactsForm',
    orderDataForModal: orderDataForModal
  })

  const toggleAddCommentModal = (orderDataForModal) => setModal({
    displayModal: !displayModal,
    modalType: 'addCommentForm',
    orderDataForModal: orderDataForModal
  })

  const toggleAddOrderNoteModal = (orderDataForModal) => setModal({
    displayModal: !displayModal,
    modalType: 'addOrderNoteForm',
    orderDataForModal: orderDataForModal
  })

  const closeModal = () => setModal({
    displayModal: !displayModal,
    modalType: '',
    orderDataForModal: {}
  })

  return (
    <>
      <Router>
        <Header />
        <MainViewContainer>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />}>
              {/* <Route index element={<ProductionCharts />} /> */}
              <Route path='production' element={<ProductionCharts />} />
              <Route path='admin' element={<AdminCharts />} />
            </Route>
            <Route
              path='/order-review'
              element={<OrderReview 
                displayModal={displayModal}
                modalType={modalType}
                orderDataForModal={orderDataForModal}
                toggleCreateOrderModal={toggleCreateOrderModal}
                toggleDeleteOrderModal={toggleDeleteOrderModal}
                toggleEditOrderModal={toggleEditOrderModal}
                toggleEditContactInfoModal={toggleEditContactInfoModal}
                toggleAddCommentModal={toggleAddCommentModal}
                toggleAddOrderNoteModal={toggleAddOrderNoteModal}
                closeModal={closeModal}
              />}
            />
            <Route
              path='/orders-hold'
              element={<OrdersHold
                displayModal={displayModal}
                modalType={modalType}
                orderDataForModal={orderDataForModal}
                toggleCreateOrderModal={toggleCreateOrderModal}
                toggleDeleteOrderModal={toggleDeleteOrderModal}
                toggleEditOrderModal={toggleEditOrderModal}
                toggleEditContactInfoModal={toggleEditContactInfoModal}
                toggleAddCommentModal={toggleAddCommentModal}
                toggleAddOrderNoteModal={toggleAddOrderNoteModal}
                closeModal={closeModal}
              />}
            />
            <Route
              path='/orders-closed'
              element={<OrdersClosed 
                displayModal={displayModal}
                modalType={modalType}
                orderDataForModal={orderDataForModal}
                toggleCreateOrderModal={toggleCreateOrderModal}
                toggleDeleteOrderModal={toggleDeleteOrderModal}
                toggleEditOrderModal={toggleEditOrderModal}
                toggleEditContactInfoModal={toggleEditContactInfoModal}
                toggleAddCommentModal={toggleAddCommentModal}
                toggleAddOrderNoteModal={toggleAddOrderNoteModal}
                closeModal={closeModal}
              />}
            />
            <Route
              path='/production'
              element={<Production 
                displayModal={displayModal}
                modalType={modalType}
                orderDataForModal={orderDataForModal}
                toggleCreateOrderModal={toggleCreateOrderModal}
                toggleDeleteOrderModal={toggleDeleteOrderModal}
                toggleEditOrderModal={toggleEditOrderModal}
                toggleEditContactInfoModal={toggleEditContactInfoModal}
                toggleAddCommentModal={toggleAddCommentModal}
                toggleAddOrderNoteModal={toggleAddOrderNoteModal}
                closeModal={closeModal}
              />}
            />
            <Route path='/ready-scan' element={<ReadyScan />} />
            <Route path='/print-test' element={<PrintTest />} />
          </Routes>
        </MainViewContainer>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

const MainViewContainer = styled.div`
  height: 85vh;
  margin:1%;
  border: 5px solid;
  border-color: #009879;
  overflow: auto;
  background-color: #4a4a4a;
  &::-webkit-scrollbar {
    width: .5vw;
    height: 1vh;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #adadad;
  }
  &::-webkit-scrollbar-track {
    background-color: #000000;
  }
  &::-webkit-scrollbar-corner {
    background-color: #009879;
  }
  @media print {
    display: block;
    height: auto;
    border: none;
    margin: none;
    padding: none;
    overflow: none;
    &::-webkit-scrollbar {
      width: 0%;
      height: 0%;
    }
  }
`