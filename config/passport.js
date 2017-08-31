const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({ id }, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
function (email, password, done) {
  User.findOne({ email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    bcrypt.compare(password, user.password, function (err, res) {
      if (!res)
        return done(null, false, { message: 'Invalid Password' });

      return done(null, user, { message: 'Logged In Successfully' });
    });
  });
}
));