const express = require('express');

const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
const Product = require('../models/product');

const csrfProtection = csrf();
router.use(csrfProtection);
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

router.get('/user/signup', (req, res) => {
  const messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0 });
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', function (req, res, next) {
  res.render('user/profile');
});
module.exports = router;
