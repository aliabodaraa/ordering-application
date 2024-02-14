const express=require('express');
const router = express.Router();
const path = require('path');
const rootPath = require('../utils/path');
const products=[];
// /admin/add-product => GET
router.get('/add-product',(req,res,next)=>{
    res.render('add-product',{pageTitle:'Add Product', path:'/admin/add-product'})
});

// /admin/add-product => POST
router.post("/add-product",(req,res,next)=>{
    console.log(req.body)
    products.push({title:req.body.title})
    res.redirect('/');
});

exports.routers=router
exports.products=products
