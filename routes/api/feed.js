const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//@route    GET homepage
//@desc     Send user to feed if logged in, if not redirect to login
//@access   Private
router.get('/',
    // auth,
    (req, res) => {
    res.send('Feed')
});

module.exports = router;