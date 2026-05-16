const User = require('../model/userModel');


exports.getAllUsers = async (req,res,next) => {
    try {
        const result = await User.findAll();
        if(result.length > 0) {
        res.status(200).json({message: 'Querry success', data: result});
        } else {
            res.status(200).json({message: 'There is no data in database'})
        }
        } catch (error) {
        res.status(500).json({message: error.message})
        }
}
exports.getOneUser = async (req,res,next) => {
    try {
        res.status(200).json({message: 'Querry success', data: req.user});
        } catch (error) {
        res.status(500).json({message: error.message})
        }
}

exports.updateUser = async (req,res,next) => {
    
} 