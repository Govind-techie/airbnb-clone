// utils/wrapAsync.js
module.exports = function wrapAsync(fn) {
    return function (req, res, next) {
      // Execute fn with proper arguments and catch any async errors
      fn(req, res, next).catch(next);
    };
  };