"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmlController = void 0;
const express_1 = require("express");
const passport = require('passport');
exports.SmlController = (0, express_1.Router)();
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.serializeUser(function (user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    /*
    Instead of user this function usually recives the id
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
    console.log(profile);
    done(null, profile);
}));
exports.SmlController.get('/', async (request, response, next) => {
    try {
        passport.authenticate('google', { scope: ['profile', 'email'] });
    }
    catch (error) {
        next(error);
    }
});
exports.SmlController.get('/callback', async (request, response, next) => {
    try {
        passport.authenticate('google'),
            // {failureRedirect: '/failed'}), 
            (request, response) => {
                // request.redirect('/good');
                console.log("request>>>>>>>>>>", request);
            };
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=sml.js.map