const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('hbs');
const rootPath = require('./utils/path');

const app = express();

// app.engine(
//   'hbs',
//   expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
//   })
// );
// View Engine Setup 
app.set('view engine', 'hbs') 
app.set('view options', {//access to views
    layout:'layouts/main-layout'
})

app.set('views','views') 

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootPath,'public')));//express here will forward any request that tries to find '.css,.js' to public folder, allow some of them to access files system


app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
