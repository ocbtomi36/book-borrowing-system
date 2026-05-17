const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    const decodedString = process.env.JWT_SECRET;
    if(!authHeader) {
       return res.status(401).json({message: 'Auth header is not set'})
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;

    if (!token) {
        return res.status(401).json({
            message: 'Token is missing'
        });
    }
    try {
        decodedToken = jwt.verify(token, decodedString);
    } catch(err) {
        return res.status(500).json({message: 'An authentication error occured', });
    }
    if(!decodedToken) {
        return res.status(401).json({message: 'Not authenticated'});
    }
    req.iduser = decodedToken.id_user;
    next();
}

