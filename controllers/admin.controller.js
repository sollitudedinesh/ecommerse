'use strict';

const express = require('express');

const adminModel = require('../models/admin.model');

const bodyParser = require('body-parser');

// const url = require('url');

const ejs = require('ejs');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');

const upload = require('express-fileupload');

// const multer = require('multer');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));

app.use(bodyParser.json());

app.use(upload());

module.exports={
  admin:(req, res) => {
    res.render('admin_views/adminDashboard');
  },
  category:(req, res) => {
    adminModel.allCategory((data) => {
      res.render('admin_views/adminCategory',{fetchData: data});
    });
  },
  addCategory:(req, res) => {
    var uploadedFile = req.files.catImage;

    uploadedFile.mv(`./assets/categoryImageFolder/${uploadedFile.name}`, (err) => {
      if(err){
        console.log(err);
      }else{
        adminModel.categoryCode((data) => { 
          var count = data[0].count + 1;
          var category_name = req.body.category_name;
          var slug = req.body.slug;
          var parent = req.body.parent;
          var description = req.body.description;
          var categoryCode = `CAT${String(count).padStart(4, '0')}`;
          var cat_img = uploadedFile.name;

          var inputData = {
            category_code: categoryCode,
            category_name: category_name,
            slug: slug,
            parent_cat: parent,
            description: description,
            cat_img: cat_img,
          };

          adminModel.addCategory(inputData, (data) => {
            res.redirect('/category');
          })
        });
      }
    })    
  },
  editCategory:(req, res) => {
    var id = req.query.id;
    adminModel.editCategory(id, (data) => {
      res.render('admin_views/editCategory',{data:data});
    })    
  },
  updateCategory:(req, res) => {
    var file = req.files;
    if(file){
      var updateFile = req.files.catImage;
      updateFile.mv(`./assets/categoryImageFolder/${updateFile.name}`, (err) => {
      if(err){
        console.log(err);
      }else{ 
          var category_name = req.body.category_name;
          var slug = req.body.slug;
          var parent = req.body.parent;
          var description = req.body.description;
          var cat_img = updateFile.name;

          var updateData = {
            category_name: category_name,
            slug: slug,
            parent_cat: parent,
            description: description,
            cat_img: cat_img,
          };

          adminModel.updateCategory(updateData, id, (data) => {
            res.redirect('/category');
          });
      }
    }) 
    }else{
      console.log(req.body);
          var category_name = req.body.category_name;
          var slug = req.body.slug;
          var parent = req.body.parent;
          var description = req.body.description;
          var cat_img = req.body.cat_img;

          var updateData = {
            category_name: category_name,
            slug: slug,
            parent_cat: parent,
            description: description,
            cat_img: cat_img,
          };

          var id = req.body.cat_id;

          adminModel.updateCategory(updateData, id, (data) => {
            res.redirect('/category');
          });
    }    
  },
  deleteCategory:(req, res) => {
    var id = req.params.id;

    var updateData = {
      active_status: '2'
    };

    adminModel.deleteCategory(updateData, id, (data) => {
      res.redirect('/category');
    })
  },
  productsList:(req, res) => {
    adminModel.getProducts((data) => {
      res.render('admin_views/productsList',{ fetchData:data });
    })
  }
}