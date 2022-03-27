const mongoose = require("mongoose");
const Schema = mongoose.Schema

const FoodSchema = new Schema(
  {
    name: {
        type:String,
        required:true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
        
    },
    image: {
        type: String,
        
    }
    




  },
  { timestamps: true }
  )



  module.exports = {Food: mongoose.model('food', FoodSchema )};