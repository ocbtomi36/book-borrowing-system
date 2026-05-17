const User = require('../../model/userModel');

module.exports = async (req,res,next)=> {
        
    try {
        const resultUser = await User.findByPk(req.iduser);
        if(resultUser === null) {
          return  res.status(401).json({message: 'User not found or invalid token'})
        }
        req.user = resultUser;
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    next();
}