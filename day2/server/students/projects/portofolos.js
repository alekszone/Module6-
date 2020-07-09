const { Schema } = require("mongoose")
const mong = require("mongoose")
const valid = require("validator")
const mongo = new Schema(
  {
id:false,
title: String,
description: String,
year: Number,
genre:{type: Array},
price: { type: Number, required: true },

 },

)
const projektsStudent = mong.model("Projects", mongo)
module.exports = projektsStudent