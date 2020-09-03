const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', (req, res) => {
    Comments.findAll({})
        .then(dbCommentsData => res.json(dbCommentsData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
});
router.post('/', withAuth, (req, res) => {
    // check the session
        Comments.create({
            comments_text: req.body.comments_text,
            posts_id: req.body.posts_id,
            // use the id from the session
            user_id: req.session.user_id
        })
            .then(dbCommentsData => {
                res.json(dbCommentsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
});

module.exports = router;
