const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const OrderService = require('../services/order.service');

const router = express.Router();
const service = new OrderService();

router.get('/my-profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        throw boom.unauthorized('User not authenticated');
      }
      res.json(user.sub);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        throw boom.unauthorized('User not authenticated');
      }
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
