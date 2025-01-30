const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(boom.unauthorized('Authentication required'));
    }
    const { rol } = req.user;
    console.log(roles);
    if (roles.includes(rol)) {
      next();
    } else {
      next(boom.unauthorized('Insufficient permissions'));
    }
  };
}

module.exports = { checkApiKey, checkRoles };
