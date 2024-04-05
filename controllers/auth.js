const bcrypt = require('bcryptjs')
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email})
  .then(userDoc => {
      if(!userDoc) return res.redirect('/login');
      bcrypt.compare(password, userDoc.password)
      .then(doMatch=>{
        if(doMatch){
          req.session.isLoggedIn = true;
          req.session.user = userDoc;
          return req.session.save(err => {
            if(err) console.log("session session : Auth Controller linew 32 : -------- >",err);
            res.redirect('/');
          });
        }
        res.redirect('/login');
      })
      .catch(err=>{
        console.log(err);
        res.redirect('/login')
      });
  })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({email})
  .then(userDoc => {
    if(userDoc) return res.redirect('/signup');

    return bcrypt.hash(password, 12)
            .then(hashedPasseord =>{
              const user = new User({
                email,
                password:hashedPasseord,
                cart:{items:[]}
              });
              return user.save();
            })
            .then(result=>res.redirect('/login'))
  })
  .catch(err=>console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
