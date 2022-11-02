import axios from 'axios';

const API_URL = '/api/orders/'

//Create new order
const createNewOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, orderData, config)

  return response.data
}

//Get orders
const getOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

//Get order
const getOrder = async (wcNumber, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + wcNumber, config)
  
  return response.data
}

//Update order
const updateOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL + orderData._id, orderData, config)

  return response.data
}

//Update orders status
const updateOrdersStatus = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(API_URL + orderData.ids + '/' + orderData.status, orderData, config)

  return response.data
}

//Delete order
const deleteOrder = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + orderId, config)

  return response.data
}

const orderService = {
  createNewOrder,
  getOrders,
  getOrder,
  updateOrder,
  updateOrdersStatus,
  deleteOrder
}

export default orderService