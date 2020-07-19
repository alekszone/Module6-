const express = require("express")

const StudentSchema = require("./mongo")

const studentRouter = express.Router()

studentRouter.get("/", async (req, res, next) => {
  try {
    const student = await StudentSchema.find(req.query)
    res.send(student)
  } catch (error) {
    next(error)
  }
})

studentRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const student = await StudentSchema.findById(id)
    if (student) {
      res.send(student)
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next("While reading student list a problem occurred!")
  }
})

studentRouter.post("/", async (req, res, next) => {
 try {
      const emailCheck = await StudentSchema.find({email:req.body.email.toLowerCase()})
   console.log(emailCheck)
   if(emailCheck.length>0){
     res.send('Email Already in use')
   }else {
  const student = new StudentSchema(req.body)
    const { _id } = await student.save()
res.status(201).send(_id)
 } } catch (error) {
    next(error)
  }
})




studentRouter.put("/:id", async (req, res, next) => {
  try {
    const student = await StudentSchema.findByIdAndUpdate(req.params.id, req.body)
  
    if (student) {
      res.send("Ok")
    } else {
      const error = new Error(`book with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

studentRouter.delete("/:id", async (req, res, next) => {
  try {
    const student = await StudentSchema.findByIdAndDelete(req.params.id)
    if (student) {
      res.send("Deleted")
    } else {
      const error = new Error(`book with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = studentRouter
