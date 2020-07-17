const express = require("express")
const db =  require("../../postgres")
const {query} = require("express")
const product = express.Router()


product.get("/", async(req,res,next)=>{
try{
    const product = await db.query(`SELECT * FROM product`)
    res.send(product.rows)
}catch(err){
    next(err)
}
}
) 
product.get("/:id",async(req,res,next)=>{
try{
    const product = await db.query(`SELECT * FROM product WHERE product_id=$1`,[req.params.id])
res.send(product.rows)
}catch(err){
    next(err)
}})

// product.get("/:")

// product.get("/:id/reviews", async(req,res,next)=>{
//     try{
//         const product = await db.query(`SELECT *
//         FROM products  LEFT JOIN LATERAL (  SELECT json_agg(json_build_object('_id', reviews._id
//           , 'comment', reviews.comment)) AS reviews  FROM   reviews  WHERE  products_id = "review_id") reviews ON true`)
//     }
// })
product.get("/:id/reviews", async (req, res, next) => {
    try {
        const students = await db.query(`SELECT
        "comment", rate, productId
    FROM  product
    JOIN reviews
    ON product_id = productid WHERE product_id = $1
    `, [req.params.id])
        res.send(students.rows)

    } catch (error) {
      next(error)
    }
})




product.post("/", async(req,res,next )=>{
try{
    const product = await db.query(`INSERT INTO public.product(
         description,brand, price, category, name,"imageUrl")
        VALUES ( $1, $2, $3, $4, $5,$6) RETURNING *  `,
         [ req.body.description, req.body.brand, req.body.price, req.body.category, req.body.name, req.body.imageUrl])
res.send("hello")
console.log(req.body)
  }catch(err){
    next(err)
}
})

product.put("/:id", async(req,res,next)=>{
    try{
const product = await db.query(`UPDATE product 
SET description = $1,
brand = $2,
 price = $3,
category = $4,
 name = $5,
 "imageUrl" = $6
 WHERE product_id = $7
  RETURNING * `,
   [req.body.description,req.body.brand,req.body.price,req.body.category,req.body.name,req.body.imageUrl,req.params.id])
res.send(product.rows)

    }catch(err){
        next(err)
    }
})


product.delete("/:id", async (req,res,next)=>{
try{
    const product = await db.query(`DELETE FROM product
	WHERE product_id=$1`,[req.params.id])
if(product)
res.send("Deleted")

}catch(err){
    next(err)
}


} )



module.exports= product


