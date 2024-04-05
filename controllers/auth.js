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
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  //Using COOKIE :
  //res.setHeader('Set-Cookie', 'loggedIn=true; Secure; HttpOnly');
  //Secure means the cookie will only be set if the page served via HTTPS
  //HttpOnly means we can't access the cookie value through client side js , it protect us from Cross Site scripting Attack try write cookieStore.get('loggedIn').then(cookie=>console.log(cookie)) will got null
  
  //Using SESSION :
  req.session.isLoggedIn=true
  res.redirect('/');
};
