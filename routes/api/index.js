const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postsRoutes = require('./posts-routes.js');

router.use('/user', userRoutes);
router.use('/posts', postsRoutes);

module.exports = router;