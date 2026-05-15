const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// Add new product page (Protected Route)
router.get('/add', protect, (req, res) => {
  res.render('add-product', { title: 'Add Product - eCommerce' });
});

// Post new product (Protected Route)
router.post('/add', protect, async (req, res) => {
  try {
    const { title, price, description, image, category, brand, condition } = req.body;
    await Product.create({
      title,
      price,
      description,
      image,
      category,
      brand,
      condition
    });
    res.redirect('/products');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating product');
  }
});

// Get all products, with optional search and pagination
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

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const products = await Product.find(query).skip(skip).limit(limit);
    const total = await Product.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.render('products', { 
      title: 'Products - eCommerce', 
      products, 
      searchQuery: search || '',
      selectedCategory: category || 'All category',
      currentPage: page,
      totalPages,
      totalItems: total
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
