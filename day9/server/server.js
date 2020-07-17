  
const express = require("express")
const server = express()
const cors = require("cors")
const { badRequestHandler , notFoundHandler ,genericErrorHandler } = require("./erroHeandlers")
const review = require("./amazon/reviews")
const product = require("./amazon/product")
const listEndpoints = require("express-list-endpoints")
server.use(express.json())
// server.use(cors())
server.use("/product", product)
server.use("/reviews", review)


server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))
server.listen(process.env.PORT || 3456, () => console.log("Running on ", process.env.PORT || 3456))