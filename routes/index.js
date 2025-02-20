var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('App', { path: req.path, title: 'Home Page', message: 'Welcome to the Home Page!' });
});
router.get('/contact', function (req, res, next) {
  res.render('App', { path: req.path, title: 'Contact Page', message: 'Welcome to the Contact Page!' });
});
router.get('/about', function (req, res, next) {
  res.render('App', { path: req.path, title: 'About Page', message: 'Welcome to the About Page!' });
});

module.exports = router;
