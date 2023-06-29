const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true,
    }


});

module.exports = mongoose.model('Category', CategorySchema);
