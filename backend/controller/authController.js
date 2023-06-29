const User = require('../models/userModel');
const { hashPassword, comparePassword } = require('../helper/authHelper');
const jwt = require('jsonwebtoken');


const registerController = async (req, res) => {

    const { name, email, password, address, phone, answer } = req.body;
    try {
        if (!name) return res.send({ message: "Name is required" });
        if (!email) return res.send({ message: "Email is required" });
        if (!password) return res.send({ message: "Password is required" });
        if (!address) return res.send({ message: "Address is required" });
        if (!phone) return res.send({ message: "Phone is required" });
        if (!answer) return res.send({ message: "Answer is required" });

        //checking the user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.send({
                success: false,
                message: "user already registered please login",
            });
        }
        //hash the password
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            phone,
            answer
        })
        res.status(201).send({
            success: true,
            message: "user registration successful",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in registration",
            error,
        })

    }
}

//login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.satus(404).send({
                success: false,
                message: "message and email field should not be empty"

            })
        }
        //checkuser
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "Email is not registered"
            })

        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password entered",
            })

        }
        //if password correct send the token to the header for advance authentication
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: '7d'
        })

        res.status(200).send({
            success: true,
            message: "login successful",
            user: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token


        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in login",
            error
        })

    }
}

const test = async (req, res, next) => {
    res.send("sandeep is valid middleware");
}

const forgotPassword = async (req, res) => {

    try {
        const { email, answer, newPassword } = req.body;
        if (!email) return res.status(400).send({ message: "email is required" });
        if (!answer) return res.status(400).send({ message: "answer is required" });
        if (!newPassword) return res.status(400).send({ message: "password is required" });

        const user = await User.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "wrong email or answer entered"
            })

        }
        const hashed = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, {
            password: hashed
        });
        res.status(200).send({
            success: true,
            message: "password changed successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "password change unsuccessful",
            error
        })

    }
};
module.exports = { registerController, loginController, test, forgotPassword };