const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../database/database');
const { type } = require('node:os');

const Borrow = sequelize.define('Borrow', {
    id_borrow: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }, 
    UserIdUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    BookIdBook: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    borrow_date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    due_date: {
        type: DataTypes.DATE,
        allowNull: false
    }

});

module.exports = Borrow;