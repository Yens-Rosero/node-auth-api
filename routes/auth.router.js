const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthService = require('../services/auth.service');
const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const rta = await service.singToken(user);

      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecovey(email);
    res.send(rta);
  } catch (error) {
    next(error);
  }
});

router.post('/recovery-password/:token', async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    await service.changePassword(token, newPassword);
    res.send('Password changed');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
