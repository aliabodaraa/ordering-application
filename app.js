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
    User.findById("660a6a502d1a19941c53257b").then(user=>{
        req.user=new User(user.name, user.email, user.cart, user._id);
        console.log(user,"HEREEEEEEE")
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