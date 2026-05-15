const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  rating: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  shipping: { type: String, default: "Free Shipping" },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String },
  brand: { type: String },
  features: [String],
  condition: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
