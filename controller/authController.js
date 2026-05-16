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
                return res.status(409).json({message: 'this email is already exist'})
            }
        }
        if(loadadUserByPinNumber !== null ) {
            const loadedId = loadadUserByPinNumber.dataValues.id_user.toString();
            if(loadedId !== paramId) {
                return res.status(409).json({message: 'this pin number is already exist'})
            }
        }
        await User.update({ given_name: given_name, family_name: family_name, pin_number: pin_number ,password: hashedPassword},{
            where: {
                id_user: paramId
            }
        });
        return res.status(200).json({message: "Update is Successfull"});
    } catch(error){
        console.log(error)
        return res.status(500).json({message: 'An login error occured'})
    }
}