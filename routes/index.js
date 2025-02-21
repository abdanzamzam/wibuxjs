const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('Home', { title: 'Home Page', message: 'Welcome to the Home Page!' });
});
router.get('/contact', function (req, res, next) {
  res.render('Contact', { title: 'Contact Page', message: 'Welcome to the Contact Page!' });
});
router.get('/about', function (req, res, next) {
  res.render('About', { title: 'About Page', message: 'Welcome to the About Page!' });
});

module.exports = router;
