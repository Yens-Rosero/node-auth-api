'use strict';
const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      field: 'recovery_token',
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token', {
      field: 'recovery_token',
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
  }
};
