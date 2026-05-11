const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../database/database');
const { type } = require('node:os');
const { default: isEmail } = require('validator/lib/isEmail');

const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    given_name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    family_name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    pin_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false

    }
    
});

module.exports = User;