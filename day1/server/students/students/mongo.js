const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const mongo = new Schema(
  {
    _id:
    {type:String},
   name: {type:String},
    surname: String,
    email: String,
    dateOfBirth: Number,
    country: Array,  
  }
  // { _id: false }
)

module.exports = mongoose.model("Mongo", mongo)