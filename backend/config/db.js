const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const connection =await mongoose.connect(process.env.ATLAS_URI);
        console.log(`database connected successfully `);
    } catch (error) {
        console.log(error.message);

    }
}

module.exports = dbConnect