const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const dbConnect = require('./config/db');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const catRoutes = require('./routes/categoryRoutes');
const prodRoutes = require('./routes/productRoutes');


//dbconnect
dbConnect();

//app initialize
const app = express();







//middlewares

app.use(express.json());

app.use(morgan("dev"));
app.use(cors({
    origin: '*'
}));

//router
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', catRoutes);
app.use('/api/v1/product', prodRoutes);


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server running on ${process.env.DEV_MODE} in port ${port} `)
})