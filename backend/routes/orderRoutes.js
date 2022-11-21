const express = require('express');
const router = express.Router();
const { 
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  updateOrdersStatus,
  fiberglassSignInAndOut,
  addComment,
  deleteOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware')

//GET
router.get('/',protect, getOrders);
router.get('/:wcNumber',protect, getOrder);

//POST
router.post('/',protect, createOrder);
router.post('/:id/newComment',protect, addComment);

//PUT
router.put('/:id',protect, updateOrder);
router.put('/:ids/updateFiberglassStatus',protect, fiberglassSignInAndOut);
router.put('/:ids/:status',protect, updateOrdersStatus);

//DELETE
router.delete('/:id',protect, deleteOrder);

module.exports = router;