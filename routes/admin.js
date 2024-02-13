const express=require('express');
const router = express.Router();
const path = require('path');
const rootPath = require('../utils/path');
const products=[];
// /admin/add-product => GET
router.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(rootPath,"views","add-product.html"));
});

// /admin/add-product => POST
router.post("/add-product",(req,res,next)=>{
    console.log(req.body);//becasue request doesطnt try to parse the incoming response ,so we need to register middleware(parser) and use third-party library called 'body-parser'
    products.push({title:req.body.title})
    res.redirect('/');
});

exports.routers=router
exports.products=products
