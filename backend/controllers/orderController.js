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
    orderStatus: req.body.orderStatus,
    billingFirstName: req.body.billingFirstName,
    billingLastName: req.body.billingLastName,
    billingCompany: req.body.billingCompany,
    billingAddress: req.body.billingAddress,
    billingCity: req.body.billingCity,
    billingPostcode: req.body.billingPostcode,
    billingCountry: req.body.billingCountry,
    billingState: req.body.billingState,
    billingEmail: req.body.billingEmail,
    billingPhone: req.body.billingPhone,
    shippingFirstName: req.body.shippingFirstName,
    shippingLastName: req.body.shippingLastName,
    shippingCompany: req.body.shippingCompany,
    shippingAddress: req.body.shippingAddress,
    shippingCity: req.body.shippingCity,
    shippingPostcode: req.body.shippingPostcode,
    shippingCountry: req.body.shippingCountry,
    shippingState: req.body.shippingState,
    shippingEmail: req.body.shippingEmail,
    shippingPhone: req.body.shippingPhone,
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

  const updatedOrders = await Order.updateMany({ _id: { $in: req.body.ids } }, { $set: { orderCurrentState: req.params.status } }, {
    new: true,
  });

  res.status(200).json(updatedOrders);
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
  createOrder,
  updateOrder,
  updateOrdersStatus,
  deleteOrder
}