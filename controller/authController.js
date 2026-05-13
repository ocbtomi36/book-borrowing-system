const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/userModel');

exports.signup = async (req, res, next) => {
    try {
        const { given_name, family_name, pin_number, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,13);
        const newUser = await User.create({
            given_name: given_name, 
            family_name: family_name, 
            pin_number: pin_number, 
            email: email, 
            password: hashedPassword
        });
        return res.status(201).json({
            message: 'User created successfully', id: newUser.id_user});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.login = async(req,res,next) => {  
    try{
        const loadedUser = req.user;
        const token = jwt.sign({
        email: loadedUser.email,
        id_user: loadedUser.id_user,
    }, 'somesupersecretsecret');
    res.status(200).json({token: token, userId: loadedUser.id_user.toString()})
    } catch(error){
        console.log(error)
        res.status(500).json({message: 'An login error occured'})
    }
}