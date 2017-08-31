/**
 * Check if authenticated by JWT
 * https://stackoverflow.com/documentation/sails.js/7050/json-web-token-authentication-with-sails#t=201708300036127877046
 */
module.exports = (req, res, next) => {
  let token;
  const authKey = 'authorization';

  if (req.headers && req.headers[authKey]) {
    token = req.headers[authKey];
    if (token.length <= 0) return res.json(401, { error: 'Format is Authorization: Bearer [token]' });

  } else if (req.param(authKey)) {
    token = req.param(authKey);
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.json(401, { error: 'No Authorization header was found' });
  }

  jwtToken.verify(token, function (err, decoded) {
    if (err) return res.json(401, { error: 'Invalid Token!' });
    User.findOne({ id: decoded.id })
      .then((user) => {
        if (!user) return next({ error: 'Invalid token' });
        req.user = decoded;
        next();
      })
      .catch(error => next({ error }));
  });
};