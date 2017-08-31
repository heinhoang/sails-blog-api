const passport = require('passport');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');

const JWT_SECRET = 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$';

const jwtOpts = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Authorization'),
  // Telling Passport where to find the secret
  secretOrKey: JWT_SECRET,
};

passport.use(new JWTStrategy(jwtOpts, (payload, done) => {
  console.log('err');
  User.findOne({ id: payload.sub }, (err, user) => {
    if (err) {
      return done(err, false, { message: 'meet error', error: err });
    }
    if (!user) {
      return done(null, false, { message: 'there\'s no user associated with this token' });
    }
    return done(null, user);
  });
}));

module.exports.jwtSettings = {
  JWT_SECRET
};