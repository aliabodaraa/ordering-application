
const express=require('express')
const app=express(); //create express app

app.use((req,res,next)=>{
    console.log("In The First Middleware");
    next();//allow the request to continue to the next middleware in line
})
app.use((req,res,next)=>{
    console.log("In The Second Middleware");
    res.send('<h1>Hello from Express !</h1>');//it make add content-type:text/html automatically and stop do anything in any next middleware
})
// const server = http.createServer(app)
// server.listen(3000,()=>{
//     console.log("Server Is Listening Now To 3000 Port")
// })
//instead
app.listen(3000)