module.exports.autoreload = {
  active: true,
  usePolling: false,
  dirs: [
    "api/models",
    "api/controllers",
    "api/services",
    "api/policies",
    "api/responses",
    "api/services",
    "config/locales",
    "config/passport.js",
  ],
  ignored: [
    // Ignore all files with .ts extension
  ]
};