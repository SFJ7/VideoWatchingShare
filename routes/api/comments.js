const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');
const Comment = require('../../models/Comment');
const Profile = require('../../models/Profile');

//@todo refactor the filtering of the comments and likes, this filter does not scale

//@route    POST api/comments
//@desc     Create a new comment
//@access   Private
router.post('/', [
    auth,
    [
        check('text', 'Text is require')
            .not()
            .isEmpty(),
        check('show', 'A show is required')
            .not()
            .isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400)
                  .json({errors: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id)
                               .select('-password');

        let episode;
        if (req.body.episode) {
            episode = req.body.episode;
        } else {
            episode = '';
        }

        const newComment = new Comment({
            text: req.body.text,
            name: user.name,
            user: req.user.id,
            show: req.body.show,
            episode: episode
        });

        const comment = await newComment.save();

        return res.json(comment);
    } catch (e) {
        console.error(e.message);
        res.status(500)
           .send('Server Error');
    }

});

//@route    Get api/comments
//@desc     Get most recent 30 posts for users not logged in
//@access   Public
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find()
                                      .sort({date: -1})
                                      .limit(30);
        return res.json(comments);
    } catch (e) {
        console.error(e.message);
        res.status(500)
           .send('Server Error');
    }
});

//@route    Get api/comments/all
//@desc     Get all comments for logged in users
//@access   Private
router.get('/all', auth, async (req, res) => {
    try {
        const comments = await Comment.find()
                                      .sort({date: -1});
        //@todo update limits for pagination or infinite scroll
        // .limit(30);
        return res.json(comments);
    } catch (e) {
        res.status(500)
           .send('Server Error');
    }
});

//@route    Get api/comments/:id
//@desc     Get post by id
//@access   Public
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404)
                      .json({msg: 'Comment not found'})
        }

        return res.json(comment);
    } catch (e) {
        if (e.kind === 'ObjectId' || e.name === 'CastError') {
            return res.status(404)
                      .json({msg: 'Post not found'})
        }

        res.status(500)
           .send('Server Error');
    }
});

//@route    DELETE api/comments/:id
//@desc     DELETE post by id
//@access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404)
                      .json({msg: 'Comment not found'})
        }

        //Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401)
                      .json({msg: 'User not authorized'})
        }

        await comment.remove();

        return res.json({msg: 'Comment Removed'});
    } catch (e) {
        if (e.kind === 'ObjectId' || e.name === 'CastError') {
            return res.status(404)
                      .json({msg: 'Post not found'})
        }

        res.status(500)
           .send('Server Error');
    }
});

//@route    PUT api/comments/like/:id
//@desc     Like a comment
//@access   Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        console.log(comment);

        //Check if user already liked. If liked, unlike it, if not like yet like it
        if (comment.likes.length > 0 && comment.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            comment.likes = comment.likes.filter(like => like.user.toString() !== req.user.id);
        } else {
            comment.likes.unshift({user: req.user.id});
        }

        await comment.save();

        return res.json(comment.likes)
    } catch (e) {
        res.status(500)
           .send('Server Error');
    }
});

//@route    POST api/comments/comment/:id
//@desc     Comment on a comment
//@access   Private
router.post('/comment/:id', [
    auth,
    [
        check('text', 'Text is required')
            .not()
            .isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400)
                  .json({errors: errors.array()})
    }

    try {
        const user = await User.findById(req.user.id)
                               .select('-password');
        const comment = await Comment.findById(req.params.id);

        const newCommentComment = {
            text: req.body.text,
            name: user.name,
            user: req.user.id
        };

        comment.comments.unshift(newCommentComment);

        await comment.save();

        return res.json(comment.comments);
    } catch (e) {
        console.error(e.message);
        res.status(500)
           .send('Server Error');
    }

});

//@route    DELETE api/comments/:id/:commentComment_id
//@desc     delete a comment of a comment
//@access   Private
router.delete('/:id/:commentComment_id', auth, async (req, res) => {
    try {

        const comment = await Comment.findById(req.params.id);

        //pull out comment
        const commentComment = comment.comments.find(comment => comment.id === req.params.commentComment_id);

        //Make sure comment exists
        if (!commentComment) {
            return res.status(404)
                      .json({msg: 'Comment does not exist'});
        }

        //Check user
        if (commentComment.user.toString() !== req.user.id) {
            return res.status(401)
                      .json({msg: 'User is not authorized'});
        }

        comment.comments = comment.comments.filter(comment => comment.id !== req.params.commentComment_id);

        await comment.save();

        return res.json(comment.comments);
    } catch (e) {
        console.error(e.message);
        res.status(500)
           .send('Server Error');
    }

});

module.exports = router;