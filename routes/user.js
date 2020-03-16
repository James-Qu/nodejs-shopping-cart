const express = require('express');
const passport = require('passport');

const router = express.Router();

const csrf = require('csurf');

const csrfProtection = csrf();
router.use(csrfProtection);

function isLoggedIn(req, res, next) {
  // isAuthenticated is added by passport
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}

function notLoggedIn(req, res, next) {
  // isAuthenticated is added by passport
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}

router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('user/profile');
});

router.get('/logout', isLoggedIn, (req, res, next) => {
  // logout is added by passport
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, (req, res, next) => {
  next();
});

router.get('/signup', (req, res) => {
  const messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0 });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/signin', (req, res, next) => {
  const messages = req.flash('error');
  res.render('user/signin', { csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0 });
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));


module.exports = router;
