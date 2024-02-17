const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const rootPath=require('./utils/path')
const erorController=require('./controllers/error')
const app = express();

app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootPath, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(erorController.get404);

app.listen(3000);
