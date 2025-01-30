require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
  email: process.env.EMAIL,
  password: process.env.EMAIL_PASSWORD,
  frontUrl: process.env.FRONTEND_URL,
};

module.exports = { config };
