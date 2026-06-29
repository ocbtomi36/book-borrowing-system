const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
const sequelize = require('./database/database');
const userModel = require('./model/userModel');
const bookModel = require('./model/bookModel');
const borrowModel = require('./model/borrowModel');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
});
app.use('/auth',authRoutes);
app.use('/users',userRoutes);
app.use('/books',bookRoutes);
app.use('/borrow',borrowRoutes);

app.use((req,res,next) => {

    const error = new Error('Route not found');
    error.statusCode = 404;
    next(error);
})


app.use((error, req, res, next) => {

    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
});
userModel.hasMany(borrowModel);
bookModel.hasMany(borrowModel);
borrowModel.belongsTo(userModel, {
    foreignKey: {
        allowNull: false
    },
    constraints: true, 
    onDelete: 'RESTRICT'});
borrowModel.belongsTo(bookModel, {
    foreignKey: {
        allowNull: false
    },
    constraints: true, 
    onDelete: 'RESTRICT'});

const port =  process.env.PORT;

sequelize.sync()
.then(result => {
    app.listen(port);
})
.catch(err => {
        console.log("Database sync error:", err);
});
