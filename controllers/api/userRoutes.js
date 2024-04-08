const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)
        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = user.id 
            res.status(200).json(user);
        }) 
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router;