const router = require('express').Router();
const { User, Posts, Comments } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // access User model and run .findall() method
    User.findAll({
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Posts,
                attributes: [
                    'id',
                    'title',
                    'posts_text',
                    'created_at']
            }
        ]
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET  /api/user/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Posts,
                attributes: ['id', 'title', 'posts_text', 'created_at']
            },
            // include the Comment model here:
            {
                model: Comments,
                attributes: ['id', 'comments_text', 'created_at'],
                include: {
                    model: Posts,
                    attributes: ['title']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData => {
            // create session data and cookie to track loggedIn status
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                req.session.cookie.maxAge = 3600000;
                res.json(dbUserData);
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.post('/login', (req, res) => {
    // expects {username and password}
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user found with that username! ' });
                return;
            }
            const validPassword = dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }
            // create session data and cookie to track loggedIn status
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                req.session.cookie.maxAge = 3600000;
                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        });
});

router.post('/logout', (req, res) => {
    // destroy session cookie and variables to logout
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

// PUT /api/user/1
router.put('/:id', (req, res) => {
    // if req.body has exact key/value pairs to match model can just use req.body instead of coding key value pairs
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with that id ' });
            return;
        }
        res.json(dbUserData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id ' });
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;