const express = require("express")
const cors = require("cors")
// const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")

const students = require("./students/students/students")
const projects = require("./students/projects/projects")

const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandlers.js")

const server = express()

const port = process.env.PORT


server.use(express.json())

server.use(cors())

server.use("/students", students)
server.use("/projects" , projects)


server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))

mongoose.connect("mongodb://localhost:27017/students-students", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port)
    })
  )
  .catch((err) => console.log(err))
