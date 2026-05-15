const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products, with optional search
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (category && category !== 'All category') {
      query.category = category;
    }

    const products = await Product.find(query);
    res.render('products', { 
      title: 'Products - eCommerce', 
      products, 
      searchQuery: search || '',
      selectedCategory: category || 'All category'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    
    // Fetch some related products
    const relatedProducts = await Product.find({ category: product.category, _id: { $ne: product._id } }).limit(6);
    
    res.render('product-detail', { 
      title: `${product.title} - eCommerce`, 
      product,
      relatedProducts
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
