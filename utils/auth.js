const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.render('login', {
            message: "You must login first",
            title: "login"
        });
        // res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;