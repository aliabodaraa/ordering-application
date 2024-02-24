const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

const mongoConnect = require('./utils/database').mongoconnect;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req,res,next)=>{
    // User.findByPk(1).then(user=>{
    //     req.user=user;
    //     next();
    // });
    next();
})

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(()=>{
    app.listen(3000);
})