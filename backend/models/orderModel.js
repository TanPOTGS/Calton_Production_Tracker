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
  isMarigold: {
    type: Boolean,
    default: false
  },
  isIndividualCustomer: {
    type: Boolean,
    default: false
  },
  isBackInShopForRepair: {
    type: Boolean,
    default: false
  },
  isFloorReady: {
    type: Boolean,
    default: false
  },
  hasProductionError: {
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
  orderNote: {
    type: String,
    default: ''
  },
  comments: [],
  productionReceivedDate: {
    type: Date,
    default: ''
  },
  shipByDate: {
    type: Date,
    default: ''
  },
  fiberglassDepartment: {
    isSignedIn: {
      type: Boolean,
      default: false
    },
    siDate: {
      type: Date,
      default: ''
    },
    siEmployee: {
      type: String,
      default: ''
    },
    isSignedOut: {
      type: Boolean,
      default: false
    },
    soDate: {
      type: Date,
      default: ''
    },
    soEmployee: {
      type: String,
      default: ''
    },
  },
  hardwareDepartment: {
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
  },
  trimDepartment: {
    siDate: {
      type: Date,
      default: ''
    },
    siEmployee: {
      type: String,
      default: ''
    },
    task1: {
      isComplete: {
        type: Boolean,
        default: false
      },
      completionTime: {
        type: String
      },
      completedBy: {
        type: String,
      }
    },
    task2: {
      isComplete: {
        type: Boolean,
        default: false
      },
      completionTime: {
        type: String
      },
      completedBy: {
        type: String,
      }
    },
    task3: {
      isComplete: {
        type: Boolean,
        default: false
      },
      completionTime: {
        type: String
      },
      completedBy: {
        type: String,
      }
    },
    task4: {
      isComplete: {
        type: Boolean,
        default: false
      },
      completionTime: {
        type: String
      },
      completedBy: {
        type: String,
      }
    },
    task5: {
      isComplete: {
        type: Boolean,
        default: false
      },
      completionTime: {
        type: String
      },
      completedBy: {
        type: String,
      }
    },
    task6: {
      isComplete: {
        type: Boolean,
        default: false
      },
      completionTime: {
        type: String
      },
      completedBy: {
        type: String,
      }
    },
    task7: {
      isComplete: {
        type: Boolean,
        default: false
      },
      completionTime: {
        type: String
      },
      completedBy: {
        type: String,
      }
    },
    task8: {
      isComplete: {
        type: Boolean,
        default: false
      },
      completionTime: {
        type: String
      },
      completedBy: {
        type: String,
      }
    },
    soDate: {
      type: Date,
      default: ''
    },
    soEmployee: {
      type: String,
      default: ''
    },
  },
  interiorsDepartment: {
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
  },
  shippingDepartment: {
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