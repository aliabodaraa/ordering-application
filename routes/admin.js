const express = require('express');
const {body} = require('express-validator')

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products',
[
    body('title').isString().isLength({min:3}).trim(),
    body('price').isFloat(),
    body('description').isLength({min:5, max:400}).trim(),
]
,isAuth, adminController.getProducts);


// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);
// router.use((req, res, next)=>{
//     console.log(req.file)
//       })
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product',
[
    body('title').trim().isString().isLength({min:3}),
    body('price').isFloat(),
    body('description').trim().isLength({min:5, max:400}),
],
isAuth, adminController.postEditProduct);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
