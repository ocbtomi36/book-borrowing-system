const { Sequelize } = require("sequelize");
require("dotenv").config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const sequelize = new Sequelize('seq_book_borrow',user,password, {
    dialect:'mysql', 
    host: host,
    logging: false
})



module.exports = sequelize;