require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to Database
connectDB();

// DB Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).send('Database connection error');
  }
});

// Set EJS as templating engine
app.set('view engine', 'ejs');
const viewsPath = process.env.NODE_ENV === 'production' 
  ? path.join(process.cwd(), 'backend', 'views')
  : path.join(__dirname, 'views');
app.set('views', viewsPath);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless deployment
module.exports = app;
