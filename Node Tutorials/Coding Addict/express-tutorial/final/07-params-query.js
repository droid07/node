const express = require('express');
const { products } = require('./data');
const app = express();

app.get('/', (req, res) => {
  res.send('<div><h1>Home page</h1><a href="/api/products">products</a></div>');
});

app.get('/api/products', (req, res) => {
  const { search, limit } = req.query;

  let sortedProducts = [...products];

  if (search) {
    sortedProducts = products.filter((product) =>
      product.name.includes(search)
    );
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, parseInt(limit));
  }

  if (sortedProducts.length === 0) {
    return res.json({ success: true, data: [] });
  }

  return res.json(sortedProducts);
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const singleProductData = products.find((product) => product.id === id);

  if (!singleProductData) {
    return res.status(404).send('Product does not exist!');
  }

  res.json(singleProductData);
});

app.get('/api/products/:id/reviews/:reviewId', (req, res) => {
  console.log(req.params);
  res.send('hello');
});

app.all('*', (req, res) => {
  res
    .status(404)
    .send('<h1>404 page!</h1><a href="/api/products">products</a>');
});

app.listen(5000, () => console.log('server running on port 5000 🔥'));
