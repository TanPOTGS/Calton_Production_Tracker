const express = require('express');
const router = express.Router();
const { 
  getOrders,
  createOrder,
  updateOrder,
  updateOrdersStatus,
  deleteOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware')

router.get('/',protect, getOrders);

router.post('/',protect, createOrder);

router.put('/:id',protect, updateOrder);

router.put('/:ids/:status',protect, updateOrdersStatus);

router.delete('/:id',protect, deleteOrder);

module.exports = router;