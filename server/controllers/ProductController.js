const codeGenerator = require("../helpers/codeGenerator");
const { Product } = require("../models/index");

class ProductController {
  static async fetchProducts(req, res, next) {
    try {
      const products = await Product.findAll();

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async fetchProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) throw { name: "Not found" };

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const { product_name, product_description, product_price, unit_of_measurement } = req.body;
      const obj = {
        product_code: codeGenerator(product_name),
        product_name,
        product_description,
        product_price,
        unit_of_measurement,
      };

      await Product.create(obj);

      res.status(200).json({ msg: "Product Created" });
    } catch (error) {
      next(error);
    }
  }

  static async updateProductById(req, res, next) {
    try {
      const { id } = req.params;
      const { product_name, product_description, product_price, unit_of_measurement } = req.body;
      const obj = {
        product_name,
        product_description,
        product_price,
        unit_of_measurement,
      };

      const product = await Product.findByPk(id);

      if (!product) throw { name: "Not found" };

      await Product.update(obj, { where: { id } });
      res.status(200).json({ msg: "Update Success" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) throw { name: "Not found" };

      await Product.destroy({ where: { id } });
      res.status(200).json({ msg: "Delete Success" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
