const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        if (req.session.user && !req.session.user.is_active) {
        req.session.destroy();
        }
        console.log("authenitcation happened not authenticated: ",req.session.user);
        res.status(401).send('<h1>Not Authorized</h1><p>Please login to continue.</p><a href="/login">Go to Login</a>');// change href to actual deployed page
    }
};

module.exports = isAuthenticated;