const express = require("express")
const db = require("../../db")

const server = express.Router()

server.get("/", async (req,res,next)=>{
try {
const student = await db.query('SELECT * FROM student')
res.send(student.rows)
}catch(err){
   next(err)
}
})

server.get("/:id", async (req,res,next)=>{
try{
const student = await db.query('SELECT * FROM student where id=$1',[req.params.id])
res.send(student.rows)
}catch(err){
    next(err)
}
})
server.post("/" , async (req,res,next)=>{
try{
    const student = await db.query(
        'INSERT INTO student (id, name, surname, email, "dateOfBirth")Values ($1,$2,$3,$4,$5) RETURNING * ',
    [
        req.body.id,
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.dateOfBirth
    ])
res.send(student.row)
}catch(err){
    next(err)
}
})

server.post("/email", async(req,res,next )=>{
try{
const email = await db.query(
    `SELECT * FROM students WHERE email =$1`, [req.body.email])
    if(checkEmail.length> 0 ){
        res.send("Email exist try new one ")
    }else{
        res.send("Email is ok")
    }
}catch(err){
next(err)
}
})



server.put("/:id", async (req,res,next)=>{
try {
const student = await db.query( 
    `UPDATE student 
SET id = $1,
 name = $2,
 surname = $3,
 email = $4,
 "dateOfBirth" = $5
 WHERE id = $6
 RETURNING *`,
 [ req.body.id, req.body.name,req.body.surname, req.body.email, req.body.dateOfBirth, req.params.id]
 )
res.send(student.row)

}catch(err){
    next(err)
}
})


server.delete("/:id", async (req,res,next)=>{
try{
    
const student =  await db.query('DELETE FROM student WHERE id=$1;',[req.params.id])
if(student.length>0){
res.send("deleted")}else{
    res.send("the id not exist")
}
}catch(err){
next(err)
}
})















module.exports = server

