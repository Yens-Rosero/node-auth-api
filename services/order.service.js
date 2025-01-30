const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    })
    if (!customer) {
      throw boom.badRequest('Customer not found');
    }
    const newOrder = await models.Order.create({ customerId: customer.id });
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    return await models.Order.findAll();
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }

  async findByUser(userId) {
    return await models.Order.findAll({
      include: [
        {
          association: 'customer',
          where: {
            userId,
          },
          include: ['user'],
        },
        'items',
      ],
    });
  }
}

module.exports = OrderService;
