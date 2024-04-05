const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');//theis package will look to the existance of a csrf token in your view (request body) 

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

const MONGODB_URI = "mongodb://localhost:27017/mongoose_test";

const store = new MongoDBStore({
  uri : MONGODB_URI,
  collection:'sessions'
});

const csrfProtection = csrf();//default will save the secret in session you can configure it to save the secret key in cookie

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secret',resave:false, saveUninitialized:false, store: store}));
app.use(csrfProtection);

app.use((req, res, next) => {
  if(!req.session.user) return next();

  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next)=>{
  // so for every request eill be executed, these fields will be set for views that are rendered 
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
