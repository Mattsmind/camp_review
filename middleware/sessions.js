const session = require('express-session');

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: ONE_WEEK
    }
}

module.exports = session(sessionConfig);