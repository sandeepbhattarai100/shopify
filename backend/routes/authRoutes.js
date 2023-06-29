const express = require('express');
const { registerController, loginController, test, forgotPassword } = require('../controller/authController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/test', verifyToken, isAdmin, test);
router.post('/forgot-password', forgotPassword);
router.get('/user-auth', verifyToken, (req, res) => {
    res.status(200).send({
        ok: true
    })
});
router.get('/admin-auth', verifyToken, isAdmin, (req, res) => {
    res.status(200).send({
        ok: true,
    })
})


module.exports = router;