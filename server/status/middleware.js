const manager = require('./');

exports.incrementSearchCounter = () => (req, res, next) => {
  manager.increment();
  next();
};
