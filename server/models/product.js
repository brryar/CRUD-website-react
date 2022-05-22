"use strict";
const { Model } = require("sequelize");
const codeGenerator = require("../helpers/codeGenerator");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      product_code: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "Product Code is required" },
          notEmpty: { msg: "Product Code is required" },
        },
      },
      product_name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "Product Name is required" },
          notEmpty: { msg: "Product Name is required" },
        },
      },
      product_description: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "Product Description is required" },
          notEmpty: { msg: "Product Description is required" },
        },
      },
      product_price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: { msg: "Product Price is required" },
          notEmpty: { msg: "Product Price is required" },
        },
      },
      unit_of_measurement: {
        allowNull: false,
        type: DataTypes.ENUM("sheet", "roll", "pcs"),
        validate: {
          notNull: { msg: "Unit of Measurement is required" },
          notEmpty: { msg: "Unit of Measurement is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
