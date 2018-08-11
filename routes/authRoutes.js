const passport = require('passport');

module.exports = (app) => {
    // GOOGLE OAuth Routes
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    app.get('/auth/google/callback',passport.authenticate('google'), (req, res) => {
        res.redirect('/whatever');
    });
    
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send('/');
    });

    //return current user in session
    app.get('/api/current_user', (req, res) => {
        // res.send(req.session);
        res.send(req.user);
    });


};
