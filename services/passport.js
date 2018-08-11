const 
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    keys = require('../config/keys')
    mongoose = require('mongoose'),
    User = mongoose.model('User'); 

passport.serializeUser(((user, done) => {
    done(null, user.id);
}));
passport.deserializeUser((id, done) => {
    User
        .findById(id)
        .then(user => done(null, user));
});

// OAuth20 Google Strategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        // console.log('Access Token', accessToken);
        // console.log('Refresh Token', refreshToken);
        // console.log('Profile', profile);
            const foundUser = await User.findOne({googleId: profile.id});
            if(foundUser) {
                console.log(foundUser);
                done(null, foundUser);
            } else {
                const user = await new User({googleId: profile.id}).save();
                done(null, user);
            }
    })
);
