const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req
  //   .get('Cookie')
  //   .split(';')[1]
  //   .trim()
  //   .split('=')[1]==='true';
  console.log(req.session.isLoggedIn)
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('660e95f4792fdba927b80abf')
  .then(user=>{
    req.session.isLoggedIn=true;
    req.session.user=user;
    req.session.save(err=>{
      res.redirect('/');//to guarantee finishing set the session before we redirect
    });
  }).catch(err=>console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err)=>{
    console.log(err)
    res.redirect('/')
  })
}
