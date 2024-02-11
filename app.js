
const http=require('http')
 const routes=require('./routes')    //the file content here acually cached by node can't added to it externaly you not do routes.ali property (you can only read from outside)

const express=require('express')

const app=express(); //create express app
app.use((req,res,next)=>{
    console.log("In The First Middleware");
    next();//allow the request to continue to the next middleware in line
})
app.use((req,res,next)=>{
    console.log("In The Second Middleware");
    res.send('<h1>Hello from Express !</h1>');//it make add content-type:text/html automatically
})
const server = http.createServer(app)

server.listen(3000,()=>{
    console.log("Server Is Listening Now To 3000 Port")
})
