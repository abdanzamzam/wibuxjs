const router = require('express').Router();

router.get('/register', function (req, res, next) {
    res.render('Register', { title: 'Register Page', message: 'Welcome to the Register Page!' });
});

router.get('/login', function (req, res, next) {
    res.render('Login', { title: 'Login Page', message: 'Welcome to the Login Page!' });
});


module.exports = router;