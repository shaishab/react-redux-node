'use strict';

var passport = require('passport'),
  User       = require('../../models/user.server.model'),
  config 		 = require('../config'),
  asset			 = require('../assets/all'),
  path 			 = require('path');

/**
 * Module init function.
 */
module.exports = function(app) {
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
  config.getGlobbedFiles(asset.server.strategies).forEach(function(strategiesPath) {
    require(path.resolve(strategiesPath))(config);
  });

  app.use(passport.initialize());
  app.use(passport.session());
};