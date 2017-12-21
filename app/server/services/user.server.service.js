'use strict';

var User          = require('../models/user.server.model'),
  errorResolver   = require('../helpers/errorResolver'),
  Promise         = require('bluebird'),
  passport        = require('passport');

exports.userSignUp = function(reqBody) {
  return new Promise((resolve) => {
    Promise.coroutine(function*() {
      try {
        var newUser = new User(reqBody);
        newUser.email = reqBody.email.toLowerCase();
        newUser.displayName = reqBody.firstName +' '+ reqBody.lastName;
        newUser.username = newUser.email;

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

exports.signIn = function(req, res) {
  return new Promise((resolve) => {
    Promise.coroutine(function*() {
      try {
        passport.authenticate('local', function(err, user, info) {
          if (err) {
            return resolve({success: false, errorMsg: errorResolver.resolve(err)});
          } else if(!user){
            return resolve({success: false, errorMsg: info.message});
          }else {
            // Remove sensitive data before login
            user.password = undefined;

            req.login(user, function(err) {
              if (err) {
                return resolve({success: false, errorMsg: errorResolver.resolve(err)});
              } else {
                return resolve({success: true, user: user});
              }
            });
          }
        })(req, res);
      } catch (err) {
        console.log('login error== ', err);
        return resolve({ success: false, errorMsg: errorResolver.resolve(err) });
      }
    })();
  });
};


exports.signOut = function(req) {
  return new Promise((resolve) => {
    Promise.coroutine(function*() {
      try {
        req.logout();
        return resolve({ success: true});
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