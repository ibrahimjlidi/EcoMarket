const { db } = require('../config/firebase');

// Get all products
const getProducts = async (req, res) => {
  try {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await db.collection('products').doc(req.params.id).get();
    if (!product.exists) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ id: product.id, ...product.data() });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new product
const createProduct = async (req, res) => {
  const { name, description, price, image, category, countInStock } = req.body;

  try {
    const productRef = await db.collection('products').add({
      name,
      description,
      price,
      image,
      category,
      countInStock,
    });
    const product = await productRef.get();
    res.status(201).json({ id: product.id, ...product.data() });
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { name, description, price, image, category, countInStock } = req.body;

  try {
    const productRef = db.collection('products').doc(req.params.id);
    const product = await productRef.get();

    if (!product.exists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await productRef.update({
      name: name || product.data().name,
      description: description || product.data().description,
      price: price || product.data().price,
      image: image || product.data().image,
      category: category || product.data().category,
      countInStock: countInStock || product.data().countInStock,
    });

    const updatedProduct = await productRef.get();
    res.json({ id: updatedProduct.id, ...updatedProduct.data() });
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const productRef = db.collection('products').doc(req.params.id);
    const product = await productRef.get();

    if (!product.exists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await productRef.delete();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
