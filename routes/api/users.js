const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/key');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');

//@route    POST api/users
//@desc     Register user
//@access   Public
router.post('/', [
    check('name', 'Username is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({min: 6}),
    check('acceptedAgreement', 'Please acknowledge that you realize this is a prototype')
        .equals('true')
], async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body.acceptedAgreement)
    if (!errors.isEmpty()) {
        return res.status(400)
                  .json({error: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
        //See if user exists
        let user = await User.findOne({email});

        if (user) {
            return res.status(400)
                      .json({errors: [{msg: 'User already exists'}]})
        }

        user = new User({
            name,
            email,
            password
        });

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

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