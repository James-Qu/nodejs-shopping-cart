const express = require('express');

const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');

/* GET home page. */
router.get('/', (req, res) => {
  // eslint-disable-next-line
  Product.find(function (err, docs) {
    const productChunks = [];
    const chunkSize = 3;
    for (let i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  });
});

router.get('/add-to-cart/:id', (req, res) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : { });

  Product.findById(productId, (err, product) => {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session);
    res.redirect('/');
  });
});

router.get('/shopping-cart', (req, res) => {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', { products: null });
  }
  const cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});


module.exports = router;
