'use strict';

var mongoose = require('mongoose'),
  bcrypt   = require('bcrypt-nodejs'),
  Schema   = mongoose.Schema;



var validateLocalStrategyProperty = function(property) {
  return (property.length);
};

var validateLocalStrategyPassword = function(password) {
  return (this.provider !== 'local' || (password && password.length > 1));
};


var UserSchema = new Schema({
    firstName: {
      type: String,
      trim: true,
      default: '',
      validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    lastName: {
      type: String,
      trim: true,
      default: '',
      validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    displayName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      unique: 'Email already exists',
      validate: [validateLocalStrategyProperty, 'Please fill in your email'],
      match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    username: {
      type: String,
      unique: 'Username already exists',
      required: 'Please fill in a username',
      trim: true
    },
    password: {
      type: String,
      default: '',
      validate: [validateLocalStrategyPassword, 'Password should not be empty']
    },
    provider: {
      type: String,
      required: 'Provider is required',
      default: 'local'
    },
    status: {
      type: String,
      default: "active"
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user']
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

UserSchema.methods.verifiedPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.pre('save', function(next) {
  if (this.password && this.password.length > 1) {
    this.password = this.generateHash(this.password);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);