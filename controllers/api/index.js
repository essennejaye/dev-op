const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postsRoutes = require('./posts-routes.js');
const commentsRoutes = require('./comments-routes.js');

router.use('/user', userRoutes);
router.use('/posts', postsRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;