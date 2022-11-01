const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const OrderSchema = new Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'User'
  // },
  orderStatus: {
    type: String,
    default: 'Open'
  },
  orderCurrentState: {
    type: String,
    default: 'review'
  },
  reviewStatus: {
    type: String,
    default: 'Hold'
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
  ralNumber: {
    type: String,
    default: 'N/A'
  },
  customer: {
    type: String
  },
  caltonRep: {
    type: String,
    default: ''
  },
  newTemplate: {
    type: Boolean,
    default: false
  },
  expedite: {
    type: Boolean,
    default: false
  },
  containsMerch: {
    type: Boolean,
    default: false
  },
  engraving: {
    type: String,
    default: 'N/A'
  },
  poNumber: {
    type: String,
    default: 'N/A'
  },
  pricing: {
    type: String,
    default: ''
  },
  serialNumber: {
    type: String,
    default: ''
  },
  dateShipped: {
    type: Date
  },
  trackingNumber: {
    type: String,
    default: ''
  },
  invoiceNumber: {
    type: String,
    default: ''
  },
  invoiceDate: {
    type: Date
  },
  invoiceSentVia: {
    type: String,
    default: ''
  },
  paymentDueDate: {
    type: Date
  },
  paymentReceivedDate: {
    type: Date
  },
  billing: {
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    company: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    postcode: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
  },
  shipping: {
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    company: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    postcode: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
  },
  comments: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      body: {
        type: String,
        required: true
      }
    }
  ],
  fiberglass: {
    siDate: {
      type: Date,
      default: ''
    },
    siEmployee: {
      type: String,
      default: ''
    },
    soDate: {
      type: Date,
      default: ''
    },
    soEmployee: {
      type: String,
      default: ''
    },
  }
}, 
{
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);