const router = require('express').Router();
const { User, Post, Comments } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    Comments.findAll({})
        .then(dbCommentsData => res.json(dbCommentsData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
});
router.post('/', (req, res) => {
    // check the session
    // if (req.session) {
        Comments.create({
            comments_text: req.body.comments_text,
            posts_id: req.body.posts_id,
            // use the id from the session
            user_id: req.body.user_id
        })
            .then(dbCommentsData => res.json(dbCommentsData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    // }
});
// router.delete('/:id', (req, res) => {
//     Comments.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(dbCommentsData => {
//             if (!dbCommentsData) {
//                 res.status(404).json({ message: 'No comment found with that id' });
//             }
//             res.json(dbCommentsData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(400).json(err);
//         });
// });

module.exports = router;