const express = require("express")
const db = require("../../db")

const server = express.Router()

server.get("/", async (req,res,next)=>{
try {
const project = await db.query('SELECT * FROM project')
res.send(project.rows)
}catch(err){
   next(err)
}
})

server.get("/:id", async (req,res,next)=>{
try{
const project = await db.query('SELECT * FROM project where id=$1',[req.params.id])
res.send(project.rows)
}catch(err){
    next(err)
}
})
server.post("/" , async (req,res,next)=>{
try{
    const project = await db.query(
        'INSERT INTO student (  id, name, descritpion, "repoURL", "liveURL", "studentID")Values ($1,$2,$3,$4,$5,$6) RETURNING * ',
    [ 
        req.body.id,
        req.body.name,
        req.body.descritpion,
        req.body.repoURL,
        req.body.liveURL,
        req.body.studentID
    ])
res.send(project.row)
}catch(err){
    next(err)
}
})

server.put("/:id", async (req,res,next)=>{
try {
const project = await db.query( 
    
    `UPDATE project 
SET id = $1,
 name = $2,
 description = $3,
 "repoURL" = $4,
 "liveURL" = $5,
 "studentID"  = $6
 WHERE id = $7
 RETURNING *`,
 [ req.body.id, req.body.name,req.body.descritpion, req.body.repoURL, req.body.liveURL,  req.body.studentID,  req.params.id]
 )
res.send(project.row)

}catch(err){
    next(err)
}
})


server.delete("/:id", async (req,res,next)=>{
try{
    
const project =  await db.query('DELETE FROM project WHERE id=$1;',[req.params.id])
if(project.length>0){
res.send("deleted")}else{
    res.send("the id not exist")
}
}catch(err){
next(err)
}
})

module.exports = server