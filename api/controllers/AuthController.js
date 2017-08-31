/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * http://iliketomatoes.com/implement-passport-js-authentication-with-sails-js-0-10-2/
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const passport = require('passport');

module.exports = {
  login: function (req, res) {
    passport.authenticate('local', { session: false }, function (err, user, info) {
      if (err) return res.json({ message: 'fail to authenticate', error: err });
      if (!user) return res.json({ message: info.message, error: 'no user' });

      req.login(user, function(err) {
        if (err) return res.json({ message: 'fail to login', error: err });
        return res.json({ message: info.message, user });
      });
    })(req, res);
  },
  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  }
};

