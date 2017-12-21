'use strict';

var userController = require('../controllers/user.server.controller'),
  config           = require('../config/config'),
  auth             = require('../helpers/authorization');

module.exports = function(app) {
  var url = config.app.baseUrl;

  app.route(url + 'login/')
    .post(userController.signIn);

  app.route(url + 'logout/')
    .post(userController.signOut);

  app.route(url + 'users/')
    .post(userController.userSignUp)
    .get(userController.list);

  app.route(url + 'user/:id')
    .get(auth.isLoggedIn, userController.getUserById);

};