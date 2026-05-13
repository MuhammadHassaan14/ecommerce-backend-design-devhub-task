const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('products', { title: 'Products - eCommerce' });
});

router.get('/:id', (req, res) => {
  res.render('product-detail', { title: 'Product Detail - eCommerce', productId: req.params.id });
});

module.exports = router;
