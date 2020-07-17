const express = require("express")
const postgres =  require("../../postgres")

const reviews = express.Router()


reviews.get("/", async(req,res,next)=>{
try{
    const review = await postgres.query('SELECT * FROM reviews')
    res.send(review.rows)
}catch(err){
    next(err)
}
}
) 
reviews.get("/:id",async(req,res,next)=>{
try{
    const review = await postgres.query('SELECT * FROM reviews WHERE review_id=$1',[req.params.id])
res.send(review.rows)
}catch(err){
    next(err)
}})

reviews.post("/",async(req,res,next )=>{
try{
    const review = await postgres.query (`INSERT INTO public.reviews(
        "comment", rate, productid)
                VALUES ($1, $2, $3 ) RETURNING *`,
                [req.body.comment, req.body.rate,req.body.productid])
res.send("New Review Aded")
            }catch(err){
    next(err)
}
})

reviews.put("/:id", async(req,res,next)=>{
    try{
const review = await postgres.query(`UPDATE reviews
SET  "comment "=$1, rate=$2, 
WHERE review_id=$3 RETURNING *`,
 [req.body.comment,req.body.rate, req.params.id])
res.send(review.row)

    }catch(err){
        next(err)
    }
})

reviews.delete("/:id", async (req,res,next)=>{
try{
    const review = await postgres.query(`DELETE FROM reviews
	WHERE review_id=$1`,[req.params.id])
if(review)
res.send("Deleted")
else
res.send("Not exist")
}catch(err){
    next(err)
}


} )



module.exports= reviews


