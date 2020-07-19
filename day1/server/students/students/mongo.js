const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const mongo = new Schema(
  {
  
    surname:{type:String,
      required:true
      },
    email: {
      type:String,
      required:true,
      lowercase:true
      },
    dateOfBirth: {type: Date,
    required:true},
    country: String,  
  }
  
)

module.exports = mongoose.model("Mongo", mongo)