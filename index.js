const 
    express = require('express'),
    mongoose = require('mongoose'),
    cookieSession = require('cookie-session'),
    passport = require('passport'),
    app = express(); //end

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

//Set up cookie
app.use(
    cookieSession({
        /* 
        days * hours in a day * minutes in an hour * seconds in an hour * millisecond in a second
        */
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
    })
);
app.use(passport.initialize());
app.use(passport.session());

//morgan logs
// const morgan = require('morgan');
// app.use(morgan('dev'));

require('./models/User');
require('./services/passport');

//ROUTES
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);