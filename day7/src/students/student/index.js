const express = require("express")
const db = require("../../db")
const { query } = require("express")

const server = express.Router()

server.get("/", async (req,res,next)=>{
try {
    const order = req.query.order || "asc"
    const offset = req.query.offset || 0
    const limit = req.query.limit || 10
    delete req.query.order
    delete req.query.offset
    delete req.query.limit
const student = await db.query('SELECT * FROM student')
const data =[]
for(dataParam in req.query){
data.push(req.query[dataParam])
if(data.length === 1 )
student += 'WHERE ${dataParam} = $${data.length}'
else
student +=  'AND ${dataParam} = $${data.length}'
}

student += "ORDER BY id " + order
data.push(limit)
student += 'LIMIT $${data.length}'
data.push(offset)
student +='OFFSET $${data.length}'
console.log(student)
const back = await db.query(student,data)
res.send(back.rows)
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

server.get("/:id/project", async (req,res,next)=>{
    try{
    const student = await db.query(`SELECT 	id,name,surname,email, "dateOfBirth" , "studentID",project_name,project_id
FROM
 public.student
JOIN public.project
ON id = "studentID" 

WHERE id=$1`,[req.params.id])
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

