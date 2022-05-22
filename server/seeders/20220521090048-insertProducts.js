"use strict";
const codeGenerator = require("../helpers/codeGenerator");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/product.json");

    data.forEach((el) => {
      el.product_code = codeGenerator(el.product_name);
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Products", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
