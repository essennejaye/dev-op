const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Posts, User, Comments } = require('../models');

router.get('/', (req, res) => {
  Posts.findAll({
    attributes: [
      'title',
      'posts_text',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;