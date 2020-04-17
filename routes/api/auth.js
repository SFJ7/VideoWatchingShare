const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/key');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');

//@route    GET api/auth
//@desc     Get user route
//@access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
    }
});

//@route    POST api/auth
//@desc     Authenticate user and get token
//@access   Public
router.post('/', [
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Password is required')
        .exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400)
                  .json({errors: errors.array()});
    }

    const {email, password} = req.body;

    function invalidCredentials() {
        return res.status(400)
                  .json({errors: [{msg: 'Invalid credentials'}]})
    }

    try {
        //See if user exists
        let user = await User.findOne({email});

        if (!user) {
            invalidCredentials();
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            invalidCredentials();
        }

        //return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            key.jwtSecret,
            {expiresIn: 360000},
            (err, token) => {
                if (err) {
                    throw err
                }
                //could send user id?
                res.json({token});
            });
    } catch (e) {
        console.error(e.message);
        res.status(500)
           .send('Server err')
    }
});


module.exports = router;