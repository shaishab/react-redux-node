'use strict';

var User          = require('../models/user.server.model'),
  errorResolver   = require('../helpers/errorResolver'),
  Promise         = require('bluebird');

exports.userSignUp = function(reqBody) {
  return new Promise((resolve) => {
    Promise.coroutine(function*() {
      try {
        var newUser = new User(reqBody);
        newUser.userEmail = reqBody.userEmail.toLowerCase();
        var UVError = newUser.validateSync();
        if(UVError) {
          return resolve({ success: false, errorMsg: errorResolver.resolve(UVError) });
        }

        yield newUser.save();
        var successData = {
          success: true,
          user: newUser
        };
        return resolve(successData);
      } catch (err) {
        return resolve({ success: false, errorMsg: errorResolver.resolve(err) });
      }
    })();
  });
};

exports.list = function() {
  return new Promise((resolve) => {
    Promise.coroutine(function*() {
      try {
        let users = yield User.find({}).exec();
        return resolve({success: true, users: users});
      } catch (err) {
        return resolve({ success: false, errorMsg: errorResolver.resolve(err) });
      }
    })();
  });
};

exports.getUserById = function(reqParams) {
  return new Promise((resolve) => {
    Promise.coroutine(function*() {
      try {
        let query = {};
        if(reqParams.id) {
          query._id =  reqParams.id;
        }
        let user = yield User.findOne(query);
        var successData = {
          success: true,
          user: user
        };
        return resolve(successData);
      } catch (err) {
        return resolve({ success: false, errorMsg: errorResolver.resolve(err) });
      }
    })();
  });
};