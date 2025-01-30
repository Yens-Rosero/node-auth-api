const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const secret = config.jwtSecret;

const payload = {
  sub: '1',
  name: 'John Doe',
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

const token = signToken(payload, secret);

console.log(token);

module.exports = { signToken };
