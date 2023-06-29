const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

const { createCategory, updateCategory, getAllCategory, getSingleCat, deleteCat } = require('../controller/categoryController');

router.post('/create-category', verifyToken, isAdmin, createCategory);
router.put('/update-category/:id', verifyToken, isAdmin, updateCategory);
router.get('/get-all-cat', getAllCategory);
router.get('/get-single-cat/:slug', getSingleCat);
router.delete('/delete-cat/:id', verifyToken, isAdmin, deleteCat);


module.exports = router;