'use strict';

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../../../models/user.server.model');

module.exports = function() {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      let query = {
        $or: [{
          username: email.toLowerCase()
        }, {
          email: email.toLowerCase()
        }]
      };

      User.findOne(query, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Unknown user or invalid password'
          });
        }
        if (!user.verifiedPassword(password)) {
          return done(null, false, {
            message: 'Unknown user or invalid password'
          });
        }

        return done(null, user);
      });
    }
  ));
};