const jwt = require('jsonwebtoken');
const key = require('../../config/key');

module.exports = function (req, res, next) {
    // Get the token from the header
    const token = req.header('x-auth-token');

    //Check if no token
    if (!token) {
        res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, key.jwtSecret);

        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(401).json({msg: 'Token is not valid'});
    }
};