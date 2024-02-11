const fs=require('fs')

const requestHandler=(req, res)=>{
    const url=req.url
    const method=req.method
    if(url =='/'){
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>')
        res.write('</html>')
        return res.end();
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
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello Form My Node.js Server !</h1></body>')
    res.write('</html>')
    res.end()
}
//1 way
//module.exports=requestHandler

//2 way
// module.exports={
//     handler:requestHandler,
//     someText:
// }

//3 way
module.exports.handler=requestHandler
module.exports.someText="Hello"

//4 way with shortcut to the way number 3 supported by node.js
exports.handler=requestHandler
exports.someText="Hello"