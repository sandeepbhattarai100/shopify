const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const { createProduct, getAllProd, getSingleProd, getProdPhoto, deleteProduct, productFilter, productPagination, getRelatedProducts, braintreeTokenController, braintreePaymentController } = require('../controller/productController');
const { isAdmin, verifyToken } = require('../middleware/authMiddleware');

router.post('/create-product', verifyToken, isAdmin, formidable(), createProduct);
router.get('/get-all-product', getAllProd);
router.get('/get-single-product/:slug', getSingleProd);
router.get('/get-product-photo/:pid', getProdPhoto);
router.delete('/delete-product/:pid', deleteProduct);
router.post('/filter-product/', productFilter);
router.get('/product-list/:page', productPagination);
router.get('/related-product/:pid/:cid', getRelatedProducts);
router.get('/braintree/token', braintreeTokenController);
router.post('/braintree/payment', verifyToken, braintreePaymentController);

module.exports = router;