const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../database/database');
const { type } = require('node:os');

const Book = sequelize.define('Book', {
    id_book: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

module.exports = Book;