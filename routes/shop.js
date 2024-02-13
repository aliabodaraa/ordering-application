const express=require('express');
const router = express.Router();

router.use('/',(req,res,next)=>{
    console.log("This Always Runc !");
    next();
})

module.exports=router