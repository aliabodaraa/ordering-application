
const http=require('http')

const routes=require('./routes')    //the file content here acually cached by node can't added to it externaly you not do routes.ali property (you can only read from outside)

const server = http.createServer(routes.handler)

server.listen(3000,()=>{
    console.log("Server Is Listening Now To 3000 Port")
})
