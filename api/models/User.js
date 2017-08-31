/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const bcrypt = require('bcryptjs');

module.exports = {

  attributes: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    userName: {
      type: 'string',
      required: true,
      unique: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 8,
      required: true
    },
    createdAt: {
      type: 'date',
      default: new Date()
    },
    posts: {
      collection: 'post',
      via: 'user'
    },
    categories: {
      collection: 'category',
      via: 'user'
    },
    toJSON: function () {
      const obj = this.toObject();
      delete obj.password;
      obj.token = jwtToken.sign({ id: obj.id });
      return obj;
    }
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hashedPassword) {
        if (err) {
          cb(err);
        } else {
          user.password = hashedPassword;
          cb();
        }
      });
    });
  }
};

