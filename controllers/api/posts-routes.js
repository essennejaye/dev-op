const router = require('express').Router();
const { User, Posts, Comments } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth')


router.get('/', (req, res) => {
    Posts.findAll({
        attributes: [
            'id',
            'title',
            'posts_text',
            'created_at',
        ],
        order: [['created_at', 'DESC']],
    })
        .then(dbPostsData => res.json(dbPostsData))
        .catch(err => {
            console.log(err);
        });
});

router.get('/:id', (req, res) => {
    Posts.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'posts_text',
            'created_at',
        ],
        include: [
            {
                model: Comments,
                attributes: ['id', 'comments_text', 'posts_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({ message: 'No post found with this id ' });
                return;
            }
            res.json(dbPostsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Posts.create({
        title: req.body.title,
        posts_text: req.body.posts_text,
        user_id: req.session.user_id
    })
        .then(dbPostsData => {
            res.json(dbPostsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Posts.update(
        {
            title: req.body.title,
            posts_text: req.body.posts_text,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({ message: "No post found with this title" });
                return;
            }
            res.json(dbPostsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Posts.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostsData => {
            if (!dbPostsData) {
                res.status(404).json({ message: 'No post found with this id ' });
                return;
            }
            res.json(dbPostsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;