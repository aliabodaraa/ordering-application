const express=require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    console.log("This Always Runc !");
    // next();
    res.send("Hello From Express !")
})

module.exports=router