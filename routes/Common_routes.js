const homeController = require('../controllers/Home');

const express = require('express');

const router = express.Router();

router.get('/',homeController.homePage);

module.exports = router;