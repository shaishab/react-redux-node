'use strict';

var userController  = require('../controllers/user.server.controller');
var config           = require('../config/config');

module.exports = function(app) {
  var url = config.app.baseUrl;

  app.route(url + 'users/')
    .post(userController.userSignUp)
    .get(userController.list);

  app.route(url + 'user/:id')
    .get(userController.getUserById);

};