require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const seedProducts = [
  {
    title: "GoPro HERO6 4K Action Camera - Black",
    price: 99.50,
    oldPrice: 1128.00,
    rating: 4.5,
    orders: 154,
    shipping: "Free Shipping",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    image: "/assets/Image/tech/6.png",
    category: "Electronics",
    brand: "GoPro",
    condition: "Brand new",
    features: ["Metallic"]
  },
  {
    title: "Canon EOS 200D Digital Camera",
    price: 350.00,
    oldPrice: 400.00,
    rating: 4.8,
    orders: 300,
    shipping: "Free Shipping",
    description: "High quality digital camera for professional photography.",
    image: "/assets/Image/tech/image 29.png",
    category: "Electronics",
    brand: "Canon",
    condition: "Brand new",
    features: ["8GB RAM", "Large Memory"]
  },
  {
    title: "Apple Watch Series 6 Space Gray",
    price: 199.99,
    oldPrice: 250.00,
    rating: 4.6,
    orders: 500,
    shipping: "Standard Shipping",
    description: "Smart watch with health tracking features.",
    image: "/assets/Image/tech/8.png",
    category: "Modern tech",
    brand: "Apple",
    condition: "Brand new",
    features: ["Super power"]
  },
  {
    title: "Lenovo ThinkPad X1 Carbon Gen 9",
    price: 1200.00,
    oldPrice: 1500.00,
    rating: 4.9,
    orders: 80,
    shipping: "Free Shipping",
    description: "Business laptop with long battery life.",
    image: "/assets/Image/tech/image 23.png",
    category: "Electronics",
    brand: "Lenovo",
    condition: "Brand new",
    features: ["8GB RAM", "Large Memory"]
  },
  {
    title: "Wireless Bluetooth Headphones",
    price: 45.00,
    oldPrice: 60.00,
    rating: 4.2,
    orders: 1200,
    shipping: "Free Shipping",
    description: "Noise cancelling wireless headphones.",
    image: "/assets/Image/tech/image 32.png",
    category: "Mobile accessory",
    brand: "Samsung",
    condition: "Brand new",
    features: ["Plastic cover"]
  },
  {
    title: "Samsung Galaxy S21 Ultra",
    price: 899.99,
    oldPrice: 1199.99,
    rating: 4.7,
    orders: 450,
    shipping: "Free Shipping",
    description: "Latest Samsung smartphone with an excellent camera.",
    image: "/assets/Image/tech/image 33.png",
    category: "Smartphones",
    brand: "Samsung",
    condition: "Brand new",
    features: ["Metallic", "Large Memory"]
  },
  {
    title: "Poco X3 Pro Smartphone",
    price: 250.00,
    oldPrice: 300.00,
    rating: 4.4,
    orders: 900,
    shipping: "Standard Shipping",
    description: "Budget gaming smartphone.",
    image: "/assets/Image/tech/image 34.png",
    category: "Smartphones",
    brand: "Poco",
    condition: "Brand new",
    features: ["Super power"]
  },
  {
    title: "Refurbished Apple iPhone 11",
    price: 350.00,
    oldPrice: 450.00,
    rating: 4.1,
    orders: 340,
    shipping: "Free Shipping",
    description: "Certified refurbished iPhone 11 in great condition.",
    image: "/assets/Image/tech/image 33.png",
    category: "Smartphones",
    brand: "Apple",
    condition: "Refurbished",
    features: ["Metallic"]
  },
  {
    title: "Huawei MateBook X Pro",
    price: 1100.00,
    oldPrice: 1400.00,
    rating: 4.6,
    orders: 110,
    shipping: "Free Shipping",
    description: "Premium ultrabook with a stunning display.",
    image: "/assets/Image/tech/image 23.png",
    category: "Electronics",
    brand: "Huawei",
    condition: "Brand new",
    features: ["Metallic", "8GB RAM"]
  },
  {
    title: "Sport Men's T-Shirt",
    price: 15.00,
    oldPrice: 20.00,
    rating: 4.0,
    orders: 2000,
    shipping: "Standard Shipping",
    description: "Comfortable cotton t-shirt for daily wear.",
    image: "/assets/Image/interior/1.png",
    category: "Clothing",
    brand: "Other",
    condition: "Brand new",
    features: []
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    console.log('Old products deleted.');
    
    await Product.insertMany(seedProducts);
    console.log('Database seeded with 10 products successfully!');
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
