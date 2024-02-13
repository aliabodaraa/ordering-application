const express=require('express');
const router = express.Router();
const path = require('path');
const rootPath = require('../utils/path');

router.get('/',(req,res,next)=>{
    console.log("This Always Runc !");
    res.sendFile(path.join(rootPath,"views","shop.html"));
})  

module.exports=router