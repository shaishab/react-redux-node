'use strict';

var passport = require('passport'),
  User = require('../../models/user.server.model');

/**
 * Module init function.
 */
module.exports = function() {
  // Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-password', function(err, user) {
      done(err, user);
    });
  });
  require('./strategies/local')(passport);
};