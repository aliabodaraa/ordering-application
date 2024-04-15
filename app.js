const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');//pasrse incoming requests as a url encoded data in (application/x-www-form-urlencoded) such as signup,login
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');//theis package will look to the existance of a csrf token in your view (request body) 
const flash = require('connect-flash');
const multer =  require('multer');        //pase incoming requests for files it is able to handle files (request with mixed data (text+file)) in (multipart/form-data) like add-product

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = "mongodb://localhost:27017/mongoose_test";

const app = express();
const store = new MongoDBStore({
  uri : MONGODB_URI,
  collection:'sessions'
});

const csrfProtection = csrf();//default will save the secret in session you can configure it to save the secret key in cookie

const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, './public/uploads');
  },
  filename:(req, file, cb)=>{
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer({dest:'images'}).single('image'));//dest make using binary data instead of buffer (it turn buffer back to binary data and store them in the path start with images directory), single to emphasize that there is on file comes with the request i can access it via "req.file"
app.use(multer({dest:'./public/uploads',fileFilter}).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public/uploads",express.static(path.join(__dirname, 'public', 'uploads')));

app.use(session({secret: 'my secret',resave:false, saveUninitialized:false, store: store}));
app.use(csrfProtection);
app.use(flash());


app.use((req, res, next)=>{
  // so for every request will be executed, these fields will be set for views that are rendered 
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  //throw new Error("AAAAAA");//outside of promises when you throw an error express will detect this and will execute the next error-handling-middleware
  if(!req.session.user) return next();

  User.findById(req.session.user._id)
    .then(user => {
      if(!user){
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      //throw new Error(err);
      //inside of promises when you throw an error express will not detect this and will not execute the next error-handling-middleware to do so inside then or catch tou will need to write 'next(new Error(err))'
      next(new Error(err));
    });
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next)=>{//express is clever enough to detects that is a special type of middleware and will move rigth away to this -- error handling middleware -- when you call next(error), it will skip all middle ware and comes to this , if you got more than on error-handling-middlewre , they'll execute from top to bottom , just like "normal" middleware
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');//inginite loop
  console.log(error)
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: false
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
