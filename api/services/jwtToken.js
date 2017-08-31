const jwt = require('jsonwebtoken');
const tokenSecret = "secretissecret";

module.exports = {
  // Generates a token from supplied payload
  sign(payload, prefix = '') {
    return prefix + jwt.sign(
      payload,
      tokenSecret,
      {
        expiresIn: "30 days"
      });
  },

  // Verifies token on a request
  verify(token, callback) {
    return jwt.verify(
      token,
      tokenSecret,
      {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
      callback
    );
  }
};