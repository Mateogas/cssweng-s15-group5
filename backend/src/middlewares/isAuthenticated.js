const isAuthenticated = (req, res, next) => {
    if (req.session.user && req.session.user.is_active === true) {
        next();
    } else {
        if (req.session.user && !req.session.user.is_active) {
            // Clear the cookie explicitly
            if (req.cookies['connect.sid']) {
                res.clearCookie('connect.sid');
            }
        
            // Use the callback to ensure session is destroyed before responding
            return req.session.destroy((err) => {
                if (err) console.error("Error destroying session:", err);
                console.log("Inactive user session terminated");
                return res.status(401).json({ message: "Account deactivated" });
            });
        }
        
        // For cases where there's no session at all
        console.log("No authenticated session");
         res.status(401).send('<h1>Not Authorized</h1><p>Please login to continue.</p><a href="https://unboundgroup.vercel.app//login">Go to Login</a>');// change href to actual deployed page
    }
};