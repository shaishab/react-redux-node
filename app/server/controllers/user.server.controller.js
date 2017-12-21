'use strict';

var utility     = require('../helpers/utility'),
  constants     = require('../helpers/constants'),
  Promise       = require('bluebird'),
  UserService   = require('../services/user.server.service');

exports.userSignUp = function(req, res) {
  Promise.coroutine(function*() {
    var response = yield UserService.userSignUp(req.body);
    if(response.success) {
      utility.logMessage('info',
        {
          id: constants.logging.actions.userSignUp,
          action: constants.logging.actions.userSignUp,
          location: constants.logging.locations.userServerController,
          req: req ,
          status: constants.logging.status.success
        },{data: response});
    } else {
      utility.logMessage('error',
        {
          id: constants.logging.actions.userSignUp,
          action: constants.logging.actions.userSignUp,
          location: constants.logging.locations.userServerController,
          req: req,
          status: constants.logging.status.failed
        }, response.errorMsg);
    }
    return res.status(200).json(response);
  })();
};

exports.signIn = function(req, res) {
  Promise.coroutine(function*() {
    var response = yield UserService.signIn(req, res);
    if(response.success) {
      utility.logMessage('info',
        {
          id: constants.logging.actions.userSignIn,
          action: constants.logging.actions.userSignIn,
          location: constants.logging.locations.userServerController,
          req: req ,
          status: constants.logging.status.success
        },{data: response});
    } else {
      utility.logMessage('error',
        {
          id: constants.logging.actions.userSignIn,
          action: constants.logging.actions.userSignIn,
          location: constants.logging.locations.userServerController,
          req: req,
          status: constants.logging.status.failed
        }, response.errorMsg);
    }
    return res.status(200).json(response);
  })();
};

exports.signOut = function(req, res) {
  Promise.coroutine(function*() {
    var response = yield UserService.signOut(req);
    if(response.success) {
      utility.logMessage('info',
        {
          id: constants.logging.actions.signOut,
          action: constants.logging.actions.signOut,
          location: constants.logging.locations.userServerController,
          req: req ,
          status: constants.logging.status.success
        },{data: response});
    } else {
      utility.logMessage('error',
        {
          id: constants.logging.actions.signOut,
          action: constants.logging.actions.signOut,
          location: constants.logging.locations.userServerController,
          req: req,
          status: constants.logging.status.failed
        }, response.errorMsg);
    }
    return res.status(200).json(response);
  })();
};

exports.list = function(req, res) {
  Promise.coroutine(function*() {
    var response = yield UserService.list();
    if(response.success) {
      utility.logMessage('info',
        {
          id: constants.logging.actions.userList,
          action: constants.logging.actions.userList,
          location: constants.logging.locations.userServerController,
          req: req ,
          status: constants.logging.status.success
        },{data: response});
    } else {
      utility.logMessage('error',
        {
          id: constants.logging.actions.userList,
          action: constants.logging.actions.userList,
          location: constants.logging.locations.userServerController,
          req: req,
          status: constants.logging.status.failed
        }, response.errorMsg);
    }
    return res.status(200).json(response);
  })();
};

exports.getUserById = function(req, res) {
  Promise.coroutine(function*() {
    var response = yield UserService.getUserById(req.params);
    if(response.success) {
      utility.logMessage('info',
        {
          id: constants.logging.actions.getUser,
          action: constants.logging.actions.getUser,
          location: constants.logging.locations.userServerController,
          req: req ,
          status: constants.logging.status.success
        },{data: response});
    } else {
      utility.logMessage('error',
        {
          id: constants.logging.actions.getUser,
          action: constants.logging.actions.getUser,
          location: constants.logging.locations.userServerController,
          req: req,
          status: constants.logging.status.failed
        }, response.errorMsg);
    }
    return res.status(200).json(response);
  })();
};
