
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
        req.on('end',()=>{// Cannot set headers after they are sent to the client
           const parseBody=Buffer.concat(body).toString()
           const message = parseBody.split('=')[1]
           fs.writeFileSync('message.txt',message)//block execution of the next kines of code unit this file done
           res.statusCode=302
           res.setHeader('Location','/')
           return res.end()
        })
        res.setHeader('Content-Type','text/html');//we should not reach to here !!
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
