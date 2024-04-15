const fs = require('fs');
const path = require('path');

const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

exports.getInvoice = (req, res, next)=>{
  const orderId = req.params.orderId;
  Order.findById(orderId).then(order=>{
    if(!order) return next(new Error('No Oeder Found.'))
    if(order.user.userId.toString() !== req.user._id.toString()) return next(new Error('UnAuthorized.'))
    const invoiceName = 'invoice-' + orderId + '.pdf';
    const invoicePath = path.join('public','invoices',invoiceName);
    // fs.readFile(invoicePath, (err, data)=>{//data here in a format of buffer
    //   if(err) return next(err);
    //   res.setHeader('Content-Type', 'application/pdf');//gives the browser some information, which allows it to handle dile and open it inline(in the browser)
    //   res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`);//define how this content should be serve to the client
    //   res.send(data)
    // });
    const file = fs.createReadStream(invoicePath);//read the file step by setp in a different chunks to avoid read the entire file into memory which ofcoures limited
    res.setHeader('Content-Type', 'application/pdf');//gives the browser some information, which allows it to handle dile and open it inline(in the browser)
    res.setHeader('Content-Disposition', `inline; filename="${invoiceName}"`);//define how this content should be serve to the client
    file.pipe(res)//forward the data that read in that stream to my response, response object is writable stream ,that means the response will be streamed to the browser and will contain the data and the data will be downloaded by the browser step by step,with that we avoid to preload the entire file into memory and waiting for all chunks to come togethter and concatinate them into one object , we just streams it to the client on the fly (we forward them to the client(browser) which the later tens to concatinate incoming data pieces into the final file)
  }).catch(err=>{

  })

}