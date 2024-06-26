"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      amenities: {
        type: Sequelize.STRING,
      },
      cost: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      zip: {
        type: Sequelize.STRING,
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(2000),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Rooms");
  },
};
