const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3010;

// Cart Data
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// End point 1
function addProductToCart(cart, productId, name, price, quantity) {
  if (cart.productId != productId) {
    cart.push({ productId, name, price, quantity });
  }
  return cart;
}
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  cart = addProductToCart(cart, productId, name, price, quantity);
  res.json({ cart });
});

// End point 2
function editQuantityInCart(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId == productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  cart = editQuantityInCart(cart, productId, quantity);
  res.json({ cart });
});

// End point 3
function deleteItemUsingProductIdwithFilter(item, productId) {
  return item.productId != productId;
}
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  cart = cart.filter((item) =>
    deleteItemUsingProductIdwithFilter(item, productId)
  );
  res.json({ cart });
});

// End point 4
app.get('/cart', (req, res) => {
  res.json({ cart });
});

// End point 5
function cartTotalQuantity(cart) {
  let quantity = 0;
  for (let i = 0; i < cart.length; i++) {
    quantity = quantity + cart[i].quantity;
  }
  return quantity;
}
app.get('/cart/total-quantity', (req, res) => {
  let totalQuantity = cartTotalQuantity(cart);
  res.json({ totalQuantity });
});

// End point 6
function calculateCartTotalPrice(cart) {
  let price = 0;
  for (let i = 0; i < cart.length; i++) {
    price = price + cart[i].price * cart[i].quantity;
  }
  return price;
}
app.get('/cart/total-price', (req, res) => {
  let totalPrice = calculateCartTotalPrice(cart);
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
