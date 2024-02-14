const express = require('express');
const path=require('path');
const bodyParser=require('body-parser');
const rootPath = require('./utils/path');

const app = express()

app.set('view engine','pug')//it is a global configuration value app.set allows us to set any value globally on our express app (this can acually keys or configuration item express can't understand in just case express will ignore them but we could acually read them from the app object using 'app.get()' that way to share data across our application)
app.set('views','views')//we can let express to know where to find our views
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(rootPath,'public')));//express here will forward any request that tries to find '.css,.js' to public folder, allow some of them to access files system
app.use("/admin",adminData.routers);
app.use(shopRoutes);

app.use((req,res,next)=>{
    res.status(404).render('404');
})
app.listen(3000)