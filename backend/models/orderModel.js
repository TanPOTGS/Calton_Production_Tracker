const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // },
  reviewStatus: {
    type: String
  },
  orderCurrentState: {
    type: String,
    default: 'review'
  },
  submitDate: {
    type: Date
  },
  reviewDate: {
    type: Date
  },
  eligibleForProductionDate: {
    type: Date
  },
  wcNumber: {
    type: String,
    required: [true, 'Please add a WC order number']
  },
  modelCode: {
    type: String,
    required: [true, 'Please add text to Model Code Field']
  },
  customer: {
    type: String
  },
  caltonRep: {
    type: String
  },
  engraving: {
    type: String
  },
  pricing: {
    type: String
  },
  orderStatus: {
    type: String,
    default: 'open'
  },
  billingFirstName: {
    type: String
  },
  billingLastName: {
    type: String
  },
  billingCompany: {
    type: String
  },
  billingAddress: {
    type: String
  },
  billingCity: {
    type: String
  },
  billingPostcode: {
    type: String
  },
  billingCountry: {
    type: String
  },
  billingState: {
    type: String
  },
  billingEmail: {
    type: String
  },
  billingPhone: {
    type: String
  },
  shippingFirstName: {
    type: String
  },
  shippingLastName: {
    type: String
  },
  shippingCompany: {
    type: String
  },
  shippingAddress: {
    type: String
  },
  shippingCity: {
    type: String
  },
  shippingPostcode: {
    type: String
  },
  shippingCountry: {
    type: String
  },
  shippingState: {
    type: String
  },
  shippingEmail: {
    type: String
  },
  shippingPhone: {
    type: String
  },
}, 
{
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);