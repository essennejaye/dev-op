const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else if (req.session.cookie.expires == true) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = withAuth;