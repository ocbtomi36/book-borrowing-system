const User = require('../model/userModel');


exports.getAllUsers = async (req,res,next) => {
    try {
        const result = await User.findAll();
        if(result.length > 0) {
            return res.status(200).json({message: 'Querry success', data: result});
        } else {
            return res.status(200).json({message: 'There is no data in database'})
        }
        } catch (error) {
            return next(error);
        }
}
exports.getOneUser = async (req,res,next) => {
    try {
        return res.status(200).json({message: 'Querry success', data: req.user});
        } catch (error) {
        return next(error);
        }
}