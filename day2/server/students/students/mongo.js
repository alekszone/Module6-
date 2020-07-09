const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const valid = require("validator")
const mongo = new Schema(
  {
  
    name:{
      type:String,
      required:true
      },
      surname:{
        type:String,
        required:true
      },
    email: {
      type:String,
      required:true,
      lowercase:true,
      validate: {
        validator: async (value) => {
          if(!valid.isEmail(value)){
            throw new Error ("Email is ivalid")
          }else{
          const email = await Students.findOne({ email: value })
          if (email) {
            throw new Error("Email exist exist already in database")
          }
        }
      }
    }
 },
    dateOfBirth: {type: Date,
    required:true},
    country: {type:String,
    required:true  
    },
phoneNumber:{
  type:Number,
  required:true,
  validate: {
    validator: async (value) => {
      const phoneNumber = await Students.findOne({ phoneNumber: value })
      if (phoneNumber) {
        throw new Error("The number exist exist exist already in database")
      }
    }
  }
},



  },

)
const Students = mongoose.model("Mongo", mongo)
module.exports = Students