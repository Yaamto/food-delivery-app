const mongoose = require("mongoose");
const Schema = mongoose.Schema

const OrderSchema = new Schema(
  {
    customer_id: {
      type: String,
    },
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,

    },
    status: {
      type: Number,
      default: 0,
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
          ref: 'food'
        },
        price: {
          type: Number,
         
        },
        description: {
          type: String
        }

      }
    ]


  },
  { timestamps: true }
)

module.exports = { Order: mongoose.model('order', OrderSchema) };