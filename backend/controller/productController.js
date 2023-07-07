const User = require('../models/userModel');
const Product = require('../models/productModels');
const fs = require('fs');
const formidable = require('formidable');
const { default: slugify } = require('slugify');

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
        const getSing = await Product.findOne({ slug: req.params.slug }).select('-photo').populate('category');
        res.status(200).send({
            success: true,
            message: "product fetch success",
            getSing
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
}
module.exports = { createProduct, getAllProd, getSingleProd, getProdPhoto, deleteProduct, productFilter };