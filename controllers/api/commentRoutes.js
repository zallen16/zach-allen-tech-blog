const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    console.log('blogRoutes post "/comment"');
    console.log(req.body.blog_id);
    try {
        const newComment = await Comment.create({
            comment_content: req.body.comment,
            blog_id: req.body.blog_id,
        });

        console.log(newComment);
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;