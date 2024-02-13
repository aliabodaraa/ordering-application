const express=require('express');
const router = express.Router();
const path = require('path');
const rootPath = require('../utils/path');
const adminRoutes = require('./admin')

router.get('/',(req,res,next)=>{
    console.log("adminRoutes.products",adminRoutes.products);
    res.sendFile(path.join(rootPath,"views","shop.html"));
})  

module.exports=router