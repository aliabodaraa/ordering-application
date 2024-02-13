const express=require('express');
const router = express.Router();
const path = require('path');

router.get('/',(req,res,next)=>{
    console.log("This Always Runc !");
    // next();
    // res.sendFile("/views/stop.html")//the absolute path is correct but it refers to the your root OS not to the root of this project
    //__dirname is just a global variable it will hold the absolute path on our OS to the folder that contains the file that we invoke the __dirname on it
    res.sendFile(path.join(__dirname,"..","views","shop.html"));//the absolute path is correct but it refers to the your root OS not to the root of this project
    //join will designed to build the path to adapt both Linux and windows paths for this reason we not put "/" between url segment like this res.sendFile(path.join(__dirname,"/views/shop.html")) (linux) or "\views\shop.html"(windows)
})  

module.exports=router