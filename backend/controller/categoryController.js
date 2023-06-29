const Category = require('../models/categoryModels');
const User = require('../models/userModel');
const slugify = require('slugify');

const createCategory = async (req, res) => {

    try {
        const { name } = req.body;
        if (!name) return res.status(401).send({ message: "Name is Required" });
        const slug = slugify(name);
        const existCat = await Category.findOne({ name });
        if (existCat) {
            return res.status(500).send({
                succss: false,
                message: "Category already Exists"
            })
        }
        const category = await Category.create({
            name,
            slug,
        });
        res.status(200).send({
            success: true,
            category
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })

    }

};

//update category

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const slug = slugify(name);
        const updated = await Category.findByIdAndUpdate(id, {
            name,
            slug
        }, {
            new: true
        })

        res.status(200).send({
            success: true,
            updated
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error
        })

    }

};

const getAllCategory = async (req, res) => {
    try {
        const getAll = await Category.find();
        res.status(200).send({
            success: true,
            getAll
        })

    } catch (error) {
        console.log(error);
        res.status(200).send({
            success: false,
            error
        })

    }
};

//get single cat

const getSingleCat = async (req, res) => {
    try {
        const singleCat = await Category.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            singleCat
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })

    }

};

const deleteCat = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Category.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            deleted
        })
    } catch (error) {

        res.status(500).send({
            success: false,
            error
        })
    }
}

module.exports = { createCategory, updateCategory, getAllCategory, getSingleCat, deleteCat };