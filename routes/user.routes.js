const express = require('express');

const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/register',userController.registerForm);

router.post('/register',userController.registerData);

router.get('/login',userController.loginForm);

router.post('/login',userController.loginDetails);

router.get('/logout', userController.logout);

router.get('/account',userController.account);

module.exports = router;