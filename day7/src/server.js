const express = require("express")
const cors = require("cors")
const { badRequestHandler , notFoundHandler ,genericErrorHandler } = require("./errorHandlers")
const db = require("./db")
const students = require("./students/student")
const project = require("./students/project")
const listEndpoints = require("express-list-endpoints")
const server = express()
server.use(cors())
server.use(express.json())

server.use("/student", students)
server.use("/project" , project)
console.log(listEndpoints(server))
server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

server.listen(process.env.PORT || 3456, () => console.log("Running on ", process.env.PORT || 3456))
