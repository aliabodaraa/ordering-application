const express=require('express');
const router = express.Router();

router.get('/add-product',(req,res,next)=>{
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
})
router.post("/product",(req,res,next)=>{
    console.log(req.body);//becasue request doesطnt try to parse the incoming response ,so we need to register middleware(parser) and use third-party library called 'body-parser'

    res.redirect('/');
})

module.exports=router