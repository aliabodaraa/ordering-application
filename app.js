const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

const mongoConnect = require('./utils/database').mongoconnect;
const User =require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req,res,next)=>{
    User.findById("6606bee0a8f74c25d72cbef7").then(user=>{
        req.user=user;
        next();
    }).catch(err=>console.log(err));
})

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(()=>{
    app.listen(3000);
})