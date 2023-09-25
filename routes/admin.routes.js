const express = require('express');

const bodyParser = require('body-parser');

const adminController = require('../controllers/admin.controller');

const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));

app.use(bodyParser.json());

router.get('/category',adminController.category);

router.post('/category',adminController.addCategory);

router.get('/editCategory',adminController.editCategory);

router.post('/editCategory',adminController.updateCategory);

router.get('/deleteCategory/:id',adminController.deleteCategory);

router.get('/productList',adminController.productsList);

router.get('/adminDashboard',adminController.admin);

module.exports = router;