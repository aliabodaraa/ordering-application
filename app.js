const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./utils/database');

//apply the relationships
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req,res,next)=>{
    User.findByPk(1).then(user=>{
        req.user=user;
        next();
    });
})
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//relationships
//1. Product - User
Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);

//2. User - Cart
User.hasOne(Cart)
Cart.belongsTo(User)

//3. Cart - Product
Cart.belongsToMany(Product, {through : CartItem})
Product.belongsToMany(Cart, {through : CartItem})

//3. Order - User
Order.belongsTo(User)
User.hasMany(Order);

//3. Order - Product
Order.belongsToMany(Product, {through : OrderItem})
Product.belongsToMany(Order, {through : OrderItem})

// sequelize.sync({force:true}).    //reconsidering the relationship that we newly setup

sequelize.sync().
then(result=>{
    return User.findByPk(1)
}).then(user=>{
    if(!user)
        return User.create({name:'Ali',email:'abodaraaali50@gmail.com'})
    return user
})
.then(user=>{
    console.log(user);
    return user.createCart();
}).then(cart=>{
    console.log(cart);
    app.listen(3000);
}).catch(err=>console.log(err));  //look at all the models that you defined and then create tables for them
