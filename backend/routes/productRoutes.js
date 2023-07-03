const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');
const { createProduct, getAllProd, getSingleProd, getProdPhoto, deleteProduct } = require('../controller/productController');
const { isAdmin, verifyToken } = require('../middleware/authMiddleware');

router.post('/create-product', verifyToken, isAdmin, formidable(), createProduct);
router.get('/get-all-product', getAllProd);
router.get('/get-single-product/:slug', getSingleProd);
router.get('/get-product-photo/:pid', getProdPhoto);
router.delete('/delete-product/:id', deleteProduct);
module.exports = router;