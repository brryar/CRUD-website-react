"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_code: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      product_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      product_description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      product_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      unit_of_measurement: {
        allowNull: false,
        type: Sequelize.ENUM("sheet", "roll", "pcs"),
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
