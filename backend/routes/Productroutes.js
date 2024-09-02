import express from 'express';
import Product from '/home/sivananthi/Documents/UKI FINAL PROJECT/backend/models/Product.js';

const productRouter = express.Router(); // Changed variable name to productRouter

// Get all products
productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product by ID
productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
productRouter.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    imageUrl: req.body.imageUrl, // Ensure the field name matches the model
    description: req.body.description,
    price: req.body.price
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a product
productRouter.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.imageUrl = req.body.imageUrl || product.imageUrl; // Ensure the field name matches the model
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
productRouter.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get products by category
productRouter.get('/category/:category', async (req, res) => {
    try {
      const products = await Product.find({ category: req.params.category });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

export default productRouter; // Changed export to match variable name
