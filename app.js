const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');

const app = express();

const User =require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req,res,next)=>{
    User.findById("660e95f4792fdba927b80abf").then(user=>{
        req.user=user;
        // console.log(user,"HEREEEEEEE")
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

mongoose.connect("mongodb://localhost:27017/mongoose_test")
.then((res)=>{
    User.findOne().then(user=>{
        if(!user){
            console.log("Connnected...");
            const user = new User({
                name:'Ali',
                email:'abodaraa50@gmail.com',
                cart:{
                    items:[]
                }
            });
            user.save();
        }
    })
    app.listen(3000);
})
.catch((err)=>{
    console.log(err)
})