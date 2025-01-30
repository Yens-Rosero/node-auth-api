const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

const secret = config.jwtSecret;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkpvaG4gRG9lIn0.1J8'


function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);

module.exports = { verifyToken };
