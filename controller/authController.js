const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/userModel');

exports.signup = async (req, res, next) => {
    try {
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.login = async(req,res,next) => {  
    try{
    
    } catch(error){
        console.log(error)
        res.status(500).json({message: 'An login error occured'})
    }
}