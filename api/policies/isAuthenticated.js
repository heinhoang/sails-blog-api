module.exports = function (req, res, next) {
  return req.isAuthenticated() ? next() : req.redirect('./login');
};