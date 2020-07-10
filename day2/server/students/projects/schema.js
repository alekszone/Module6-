
const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const ProjectSchema = new Schema(
    {
       title: String,
description: String,
year: Number,
genre:{type: Array},
price: { type: Number, required: true },
        studentId: [{
            type: Schema.Types.ObjectId,
            ref: "students",
            required: true
        }]

    }
)
module.exports = mongoose.model("projects", ProjectSchema)