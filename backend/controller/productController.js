const User = require('../models/userModel');
const Product = require('../models/productModels');
const fs = require('fs');
const formidable = require('formidable');
const { default: slugify } = require('slugify');
const Order = require('../models/orderModels');
const dotenv = require('dotenv').config();
const braintree = require("braintree");
const { response } = require('express');

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,


    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

const createProduct = async (req, res) => {
    try {
        const { description, price, category, name, quantity, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" })
            case !description:
                return res.status(500).send({ error: "Description is required" })
            case !price:
                return res.status(500).send({ error: "Price is required" })
            case !category:
                return res.status(500).send({ error: " Category is required" })
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is required and photo size should be less than 1mb" })

        }
        const slug = slugify(name);
        const product = new Product({
            ...req.fields,
            slug
        });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(200).send({
            success: true,
            message: "product created successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating products"
        })

    }
};
//getallprod
const getAllProd = async (req, res) => {
    try {
        const getAll = await Product.find({}).populate('category').select('-photo').limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            count: getAll.length,
            getAll
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Could not fetch the product"
        });

    }
};

//getSingleProd
const getSingleProd = async (req, res) => {
    try {
        const slug = req.params.slug;

        const product = await Product.find({ slug }).select('-photo').populate('category');
        res.status(200).send({
            success: true,
            message: "product fetch success",
            product
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "product fetch unsuccess",
            error: error.message
        })

    }

};

//get prod photo

const getProdPhoto = async (req, res) => {
    try {
        const prodPhoto = await Product.findById(req.params.pid).select('photo');

        if (prodPhoto.photo.data) {
            res.set('Content-type', prodPhoto.photo.contentType);
            return res.status(200).send(prodPhoto.photo.data)

        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "photo fetch unsuccess",
            error: error.message
        })
    }
};

// const getProdPhoto = async (req, res) => {
//     try {
//         const prodPhoto = await Product.findById(req.params.pid).select('photo');

//         if (prodPhoto.photo.data) {

//             // res.set('Content-type', prodPhoto.photo.contentType);
//             // console.log(prodPhoto.photo.data)
//             // return res.status(200).send(prodPhoto.photo.data)
//             console.log(prodPhoto.photo.data);
//         }

//     } catch (error) {
//         console.log("Error Error")
//         console.error(error)
//         res.status(500).send({
//             error: "photo fetch unsuccess",
//         })
//     }
// }

//delete prod
const deleteProduct = async (req, res, next) => {
    try {

        const deleted = await Product.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(200).send({
            success: true,
            message: "product delete successful "
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "cannot delete item",
            error: error.message
        })

    }
};

const productFilter = async (req, res) => {
    try {
        const { checked, range } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (range.length) args.price = { $gte: range };
        const product = await Product.find(args);
        res.status(200).send({
            success: true,
            product
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "couldnot filter products",
            error
        })

    }
};

//pagination

const productPagination = async (req, res) => {


    try {
        const perPage = 3;
        const page = req.params.page ? req.params.page : 1;
        const getAll = await Product.find({}).select('-photo').skip((page - 1) * perPage).limit(perPage).sort({
            createdAt: -1
        });
        res.status(200).send({
            success: true,
            getAll
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })

    }
};

const getRelatedProducts = async (req, res) => {
    try {
        const { pid, cid } = req.params;

        const product = await Product.find({
            category: cid,
            _id: { $ne: pid },
        }).select('-photo').limit(3).populate('category');
        res.status(200).send({
            success: true,
            message: "fetch cuccessful",
            product
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "cannot fetch the product",
            error
        })

    }
}

//controllers for payment gateway

const braintreeTokenController = (req, res) => {
    try {



        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });



    } catch (error) {
        console.log(error.message);

    }

};

//payment controller
const braintreePaymentController = (req, res) => {
    try {
        let total = 0;
        const { cartItem, nonce } = req.body;
        cartItem.map(i => total += i.price);

        let transaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            (err, result) => {
                if (result) {
                    const order = new Order({
                        products: cartItem,
                        payment: result,
                        buyer: req.user.id,

                    }).save();
                    res.json({
                        ok: true
                    })

                }
                else {
                    res.status(500).send(err);
                }
            });


    } catch (error) {
        console.log(error);

    }

}
module.exports = { createProduct, getAllProd, getSingleProd, getProdPhoto, deleteProduct, productFilter, productPagination, getRelatedProducts, braintreeTokenController, braintreePaymentController };