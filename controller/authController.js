const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/userModel');
const { where } = require('sequelize');

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
        return next(error);
    }
}

exports.login = async(req,res,next) => {  
    try{
        const loadedUser = req.user;
        const secretString = process.env.JWT_SECRET;
        const token = jwt.sign({
        email: loadedUser.email,
        id_user: loadedUser.id_user,
    }, secretString);
    res.status(200).json({token: token, userId: loadedUser.id_user.toString()})
    } catch(error){
        return next(error);
    }
}

exports.modifyUser = async(req,res,next) => {
    const { given_name, family_name, pin_number, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password,13);
    const paramId = req.params.iduser;
    const loadedUserByEmail = await User.findOne({
        where: {
            email:email
        }
    })
    const loadadUserByPinNumber = await User.findOne({
        where: {
            pin_number : pin_number
        }
    })
    try{
        if(loadedUserByEmail !== null ) {
            const loadedId = loadedUserByEmail.dataValues.id_user.toString();
            if(loadedId !== paramId) {
                const error = new Error('this email is already exist');
                error.statusCode = 409;
                next(error);
            }
        }
        if(loadadUserByPinNumber !== null ) {
            const loadedId = loadadUserByPinNumber.dataValues.id_user.toString();
            if(loadedId !== paramId) {

                const error = new Error('this pin_number is already exist');
                error.statusCode = 409;
                next(error);
            }
        }
        await User.update({ given_name: given_name, family_name: family_name, pin_number: pin_number ,password: hashedPassword},{
            where: {
                id_user: paramId
            }
        });
        return res.status(200).json({message: "Update is Successfull"});
    } catch(error){
        return next(error);
    }
}