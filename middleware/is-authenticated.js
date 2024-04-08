function isAuthenticatedUser(req, res, next) {
    return !req.session.loggedIn ? res.redirect("/login") : next();
}

module.exports = {
    isAuthenticatedUser
};