'use strict';

var mongoose = require('mongoose'),
  bcrypt   = require('bcrypt-nodejs'),
  Schema   = mongoose.Schema;

var UserSchema = new Schema({
    userEmail: {
      type: String,
      unique: true,
      required: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email']
    },
    userPwd: String,
    status: {
      type: String,
      default: "active"
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user','writer']
      },
      default: 'user'
    },
    sessions: {
      sessionToken : String,
      createDateTime:{
        type: Date,
        default: Date.now
      },
      lastAccessDateTime:{
        type: Date,
        default: Date.now
      }
    }
  },
  {timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedDate'
  }});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.userPwd);
};

module.exports = mongoose.model('User', UserSchema);