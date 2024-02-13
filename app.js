const express = require('express');
const path=require('path');
const bodyParser=require('body-parser');
const rootPath = require('./utils/path');

const app = express()

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(rootPath,'public')));//express here will forward any request that tries to find '.css,.js' to public folder, allow some of them to access files system
app.use("/admin",adminRoutes);
app.use(shopRoutes);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootPath,"views","404.html"));
})
app.listen(3000)