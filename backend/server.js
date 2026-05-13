const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');

app.use('/', indexRouter);
app.use('/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
