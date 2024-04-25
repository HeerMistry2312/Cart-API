const Product = require("../models/product");

exports.addProduct = async (req, res) => {
  try {
    console.log("hi")
    let product = new Product(req.body);
    const newPro = await product.save();
    res.send({ data: newPro });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
exports.showProduct = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products)
    res.send({ data: products });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const result = await Product.deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.send({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
exports.editProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });

    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.send({ data: product });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}