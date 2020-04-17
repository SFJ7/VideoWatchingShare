const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');


const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route    GET api/profile/me
//@desc     Get current user's profile
//@access   Private
router.get('/me', auth, async (req, res) => {
    try {
        console.log(req.user);
        const profile = await Profile.findOne({user: req.user.id})
                                     .populate('user', ['name']);
        if (!profile) {
            return res.status(400)
                      .json({msg: 'There is no profile for this user'})
        }
        res.json(profile);
    } catch (e) {
        console.error(e.message);
        res.status(500)
           .send('Server Error');
    }
});

//@route    POST api/profile/
//@desc     Create or update user profile
//@access   Private
// router.post('/', [auth, [check('thing', 'error message').not.isEmpty()]] (req, res)) - if you want to require
router.post('/', auth, async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400)
    //               .json({errors: errors.array()});
    // }

    const {
        currentlyWatching,
        finishedWatching,
        facebook,
        twitter,
        instagram,
        youtube,
        linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (currentlyWatching) profileFields.currentlyWatching = currentlyWatching;
    if (finishedWatching) profileFields.finishedWatching = finishedWatching;

    profileFields.social = {};
    //Build social object
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
        let profile = await Profile.findOne({user: req.user.id});

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true});

            return res.json(profile)
        }

        profile = new Profile(profileFields);

        await profile.save();
        return res.json(profile);
    } catch (e) {
        console.error(e.message);
        res.status(500)
           .send('Server Error');
    }
});

//@route    GET api/profile
//@desc     Get all profiles
//@access   Public
router.get('/', async (req, res) => {
    try {

        const profiles = await Profile.find().limit(20).populate('user', ['name']);

        return res.json(profiles)
    } catch (e) {
        res.status(500).send('Server Error');
    }
});

//@route    GET api/profiles
//@desc     Get all profiles except current user if logged in
//@access   Private
router.get('/all', auth, async (req, res) => {
    try {
        console.log(req.user);
        const profiles = await Profile.find({user:{$ne:req.user.id}}).limit(20).populate('user', ['name']);

        return res.json(profiles)
    } catch (e) {
        res.status(500).send('Server Error');
    }
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   Public
router.get('/user/:user_id', async (req, res) => {
   try {
       const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name']);

       if (!profile) return res.status(400).json({msg: 'Profile not found'});

       return res.json(profile)
   } catch (e) {
       console.error(e.message);
       if (e.kind === 'ObjectId') {
           return res.status(400).json({msg: 'Profile not found'});
       }
       res.status(500).send('Server Error');
   }
});

//@route    DELETE api/profile
//@desc     Delete profile, user and posts
//@access   Private
router.delete('/', auth, async (req, res) => {
    try {
        //@todo remove user posts

        //Delete profile
        await Profile.findOneAndRemove({user: req.user.id});

        //Delete user
        await User.findOneAndRemove({_id: req.user.id});
        return res.json({msg: "User deleted"})
    } catch (e) {

        if (e.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
});


module.exports = router;