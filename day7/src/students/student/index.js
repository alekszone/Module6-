const express = require("express")
const db = require("../../db")

const server = express.Router()

server.get("/", async (req,res)=>{
try {
const student = await db.query('SELECT * FROM student')
res.send(student.rows)
}catch(err){
   next(err)
}
})

server.get("/:id", async (req,res)=>{
try{
const student = await db.query('SELECT * FROM student where id=$1',[req.params.id])
res.send(student.rows)
}catch(err){
    next(err)
}




})






module.exports = server

