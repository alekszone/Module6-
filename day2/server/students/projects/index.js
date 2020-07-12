const express = require("express")
const q2m = require ("query-to-mongo")
const portofolosStud = require("./schema")
const projectStudents = express.Router()

projectStudents.get("/", async (req, res, next) => {
  try {
    const stud = q2m(req.query)
    const student = await portofolosStud.find(stud.criteria, stud.options.fields)
    .skip(stud.options.skip )
    .limit(stud.options.limit)
    .sort(stud.options.sort)
     res.send({
       student,
      numberOfStudents: student.length
        })
  } catch (error) {
    next(error)
  }
})

projectStudents.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const student = await portofolosStud.findById(id)
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
projectStudents.post("/", async (req, res, next) => {
  try {
    const student = new portofolosStud(req.body)
    const { _id } = await student.save()

    res.status(201).send(_id)
  } catch (error) {
    next(error)
  }
})



projectStudents.put("/:id", async (req, res, next) => {
  try {
    const student = await portofolosStud.findByIdAndUpdate(req.params.id, {...req.body})
  
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

projectStudents.delete("/:id", async (req, res, next) => {
  try {
    const student = await portofolosStud.findByIdAndDelete(req.params.id)
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

module.exports = projectStudents
