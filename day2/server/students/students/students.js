const express = require("express")
const q2m = require ("query-to-mongo")
const StudentSchema = require("./mongo")
const Students = require("./mongo")
 const  ProjectsSchema = require("../projects/portofolos")

const studentRouter = express.Router()

studentRouter.get("/", async (req, res, next) => {
  try {
    const stud = q2m(req.query)
    const student = await StudentSchema.find(stud.criteria, stud.options.fields)
.skip(stud.options.skip )
.limit(stud.options.limit)
.sort(stud.options.sort)
res.send({
  AllStudents:student,
TotalStudents:[ student,],
numberOfStudents: student.length
})
  } catch (error) {
    next(error)
  }
})
studentRouter.get("/:_id/projects", async (req, res, next) => {
  try {
    const id = req.params._id
    console.log(id)
    const student = ProjectsSchema.findById(id)
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
studentRouter.post("/:_id/projects", async (req, res, next) => {
  try {
      const student = new ProjectsSchema({ _id:req.body._id,...req.body})

      const { _id } = await student.save()
  
      res.status(201).send(_id)
    } catch (error) {
      next(error)
    }
  })



studentRouter.put("/:id", async (req, res, next) => {
  try {
    const student = await StudentSchema.findByIdAndUpdate(req.params.id, {...req.body},{runValidators:true})
  
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
