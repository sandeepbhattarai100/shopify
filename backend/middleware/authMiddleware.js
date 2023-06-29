const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const verifyToken = async (req, res, next) => {
    try {
        const decode = jwt.verify(req?.headers?.authorization, process.env.SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error.message);

    }
};

const isAdmin = async (req, res, next) => {
    // console.log(req.user.id);
    try {
        const user = await User.findById(req.user.id);
        console.log(user);
        if (user?.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "unauthorized access"
            })

        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(403).send({
            success: false,
            message: "you are not admin"
        })
    }
};

module.exports = { verifyToken, isAdmin }