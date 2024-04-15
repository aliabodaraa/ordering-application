
const fileHelper = require('../utils/file');
const {validationResult} = require('express-validator/src');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    hasError: false,
    errorMessage:null,
    validationErrors:[]
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  if(!image){//check if multer not decline the request's file
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: false,
      product: {title,price,description},
      hasError: true,
      errorMessage:"Attached file is not an image .",
      validationErrors:[]
    });
  }
  const imageUrl = image.path;

  console.log(req.file,"-----------------")
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors.array(),"-------")
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: false,
      product: {title,imageUrl,price,description},
      hasError: true,
      errorMessage:errors.array()[0].msg,
      validationErrors:errors.array()
    });
  }
  //throw new Error("Sssss")//sync throw error that not embeded inside then or catch will directly go to error-handling-middleware iside them we need to call next(ny_error) to reach our error-handling-middlewre
  const product = new Product({
    // _id:"Aa", //cause an error deliberately
    title: title,
    price: price,
    description: description,
    imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      console.log(product)
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        hasError: false,
        errorMessage:null,
        validationErrors:[]
      });
    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  // const updatedImageUrl = req.body.imageUrl;
  const updatedImage = req.file;
  const updatedDesc = req.body.description;
  console.log(updatedImage,"--------",req.file)
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors.array(),"-------")
    return res.status(422).render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: {title:updatedTitle,price:updatedPrice,description:updatedDesc,_id:prodId},
      hasError: true,
      errorMessage:errors.array()[0].msg,
      validationErrors:errors.array()
    });
  }

  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      if(updatedImage){
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl=updatedImage.path
      }
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err)
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then(product=>{
    if(!product) return next(new Error('Product Not Nound'));
    fileHelper.deleteFile(product.imageUrl);
    return Product.deleteOne({_id:prodId, userId: req.user._id});
  })
  .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err)
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
