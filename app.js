
const express=require('express');
const bodyParser=require('body-parser');
const app=express(); //create express app

app.use(bodyParser.urlencoded({extended:false}))//return function has next() inside, it won't parse all kinds of possible bodies only bodies that send throw a form
app.use('/',(req,res,next)=>{
    console.log("This Always Runc !");
    next();
})
app.use('/add-product',(req,res,next)=>{
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
})
app.use("/product",(req,res,next)=>{
    console.log(req.body);//becasue request doesطnt try to parse the incoming response ,so we need to register middleware(parser) and use third-party library called 'body-parser'

    res.redirect('/');
})

app.listen(3000)