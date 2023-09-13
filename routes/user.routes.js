const express = require('express');

const bodyParser = require('body-parser');

const userController = require('../controllers/user.controller');

const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));

app.use(bodyParser.json());

router.get('/register',userController.registerForm);

router.post('/register',userController.registerData);

router.get('/login',userController.loginForm);

router.post('/login',userController.loginDetails);

router.get('/logout', userController.logout);

router.get('/account',userController.account);

router.get('/profile',userController.profile);

router.post('/profile', userController.updateProfile);

module.exports = router;