
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended:false}))//return function has next() inside, it won't parse all kinds of possible bodies only bodies that send throw a form
app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000)