const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Blog, User } = require('../../models');

router.get('/:id', withAuth, async (req, res) => {
    console.log('get blog by id');
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });

        const blog = blogData.get({ plain: true });

        res.status(200).json(blog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    console.log('blogRoutes post "/"');
    try {
        const newBlog = await Blog.create({
            title: req.body.title,
            contents: req.body.post,
            funding: req.body.funding,
            user_id: req.sessions.user_id,
        });

        res.status(200).jsons(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        console.log('blog update - ' + req.params.id);
        const updatedBlog = await Blogupdate(
            {
                title: req.body.title,
                contents: req.body.post,
                funding: req.body.funding,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            }
        );

        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;