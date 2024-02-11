
const http=require('http')
const fs=require('fs')

const server = http.createServer((req,res)=>{
    const url=req.url
    const method=req.method
    if(url =='/'){
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"></form></body>')
        res.write('</html>')
    }
    if(url==="/message" && method==="POST"){
        const body=[]
        req.on('data',(chunk)=>{
            console.log(chunk)
            body.push(chunk)
        })
        return req.on('end',()=>{
            const parseBody=Buffer.concat(body).toString()
           const message = parseBody.split('=')[1]
           fs.writeFile('message.txt',message,(err)=>{//nodejs event driven architecture you basically tell nodejs go ahead and load the process to OS in terms uses muli threads then continue event loop and listening to event callback and come back once the operation done by OS
            //this code will be executed when we done parsing the request and writing the file
            res.statusCode=302
            res.setHeader('Location','/')
            return res.end()
           })
        })
        res.setHeader('Content-Type','text/html');
        res.write('<html>')
        res.write('<head><title>My First Page</title></head>')
        res.write('<body><h1>Hello Form My Node.js Server !</h1></body>')
        res.write('</html>')
        res.end()
    }
})
server.listen(3000,()=>{
    console.log("Server Is Listening Now To 3000 Port")
})
