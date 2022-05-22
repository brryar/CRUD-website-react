const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const ProductController = require("./controllers/ProductController");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "CRUD Website Reach Server is Running." });
});

app.get("/products", ProductController.fetchProducts);
app.get("/products/:id", ProductController.fetchProductById);
app.post("/products", ProductController.addProduct);
app.put("/products/:id", ProductController.updateProductById);
app.delete("/products/:id", ProductController.deleteProductById);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
