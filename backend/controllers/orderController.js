const asyncHandler = require('express-async-handler');

// Order Model
const Order = require('../models/orderModel');
// const User = require('../models/userModel');

// @desc  Get All Orders
// @route   GET api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  // const orders = await Order.find({ user: req.user.id });
  const orders = await Order.find();

  res.status(200).json(orders);
})

// @desc  Get Specific Order
// @route   GET api/orders/:wcNumber
// @access  Private
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({wcNumber: req.params.wcNumber});

  res.status(200).json(order);
  // console.log(req.body)
})

// @desc  Create An Order
// @route   POST api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  if(!req.body.wcNumber) {
    res.status(400)
    throw new Error('Please add a WC number')
  };
  
  if(!req.body.modelCode) {
    res.status(400)
    throw new Error('Please add text to Model Code Field')
  };

  const order = await Order.create({
    // user: req.user.id,
    reviewStatus: req.body.reviewStatus,
    submitDate: req.body.submitDate,
    reviewDate: req.body.reviewDate,
    eligibleForProductionDate: req.body.eligibleForProductionDate,
    wcNumber: req.body.wcNumber,
    modelCode: req.body.modelCode,
    customer: req.body.customer,
    caltonRep: req.body.caltonRep,
    engraving: req.body.engraving,
    pricing: req.body.pricing,
    // orderStatus: req.body.orderStatus,
    billing: {
      firstName: req.body.billing.firstName,
      lastName: req.body.billing.lastName,
      company: req.body.billing.company,
      address: req.body.billing.address,
      city: req.body.billing.city,
      postcode: req.body.billing.postcode,
      country: req.body.billing.country,
      state: req.body.billing.state,
      email: req.body.billing.email,
      phone: req.body.billing.phone
    },
    shipping: {
      firstName: req.body.shipping.firstName,
      lastName: req.body.shipping.lastName,
      company: req.body.shipping.company,
      address: req.body.shipping.address,
      city: req.body.shipping.city,
      postcode: req.body.shipping.postcode,
      country: req.body.shipping.country,
      state: req.body.shipping.state,
      email: req.body.shipping.email,
      phone: req.body.shipping.phone
    }
  });

  res.status(200).json(order);
})

// @desc  Update An Order
// @route   PUT api/orders/:id
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if(!order) {
    res.status(400)
    throw new Error('Order not found')
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }

  // Make sure the logged in user matches the order user
  // if (order.user.toString() !== req.user.id) {
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedOrder);
})

// @desc  Update multiple orders
// @route   PUT api/orders/:ids/:status
// @access  Private
const updateOrdersStatus = asyncHandler(async (req, res) => {
  // const order = await Order.findById(req.params.id);
  // const orders = await Order.find({ _id: req.user.id });

  // if(!order) {
  //   res.status(400)
  //   throw new Error('Order not found')
  // }

  const data = {
    orderCurrentState: req.params.status,
    productionReceivedDate: req.body.productionReceivedDate,
    shipByDate: req.body.shipByDate
  }

  const updatedOrders = await Order.updateMany({ _id: { $in: req.body.ids } }, { $set: data }, {
    new: true,
  });

  res.status(200).json(updatedOrders);
})

// @desc  Add comment to order
// @route   POST api/orders/:id/newComment
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if(!order) {
    res.status(400)
    throw new Error('Order not found')
  }

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
    $push: {comments: req.body}
  }, {
    safe: true,
    upsert: true
  });

  res.status(200).json(updatedOrder);
})

// @desc  Delete An Order
// @route   DELETE api/orders/:id
// @access  Public
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if(!order) {
    res.status(400)
    throw new Error('Order not found')
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }

  // Make sure the logged in user matches the order user
  // if (order.user.toString() !== req.user.id) {
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }

  await order.remove();

  res.status(200).json({ id: req.params.id });
})

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  updateOrdersStatus,
  addComment,
  deleteOrder
}