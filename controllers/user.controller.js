'use strict';

const express = require('express');

const user = require('../models/user.model');

const bodyParser = require('body-parser');

const ejs = require('ejs');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'profile/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports={
  registerForm: (req, res) => {
    res.render('register')
  },
  registerData: (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var password = req.body.password;
    var username = req.body.username;

    const saltRound = 10;

    bcrypt.hash(password, saltRound, (err, hash) => {
      if(err){
        res.send(err);
      }else{
        const inputData= {
          name :name,
          email :email,
          mobile :mobile,
          password :password,
          username :username,
        };
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
            auth: {
                  user: 'dineshkumar2001jan@gmail.com',
                  pass: 'pxwsabobaplsrdzq'
                }
        })

        const mailTemplate = `
            Your registration successfull now you can login with your username and password we mentioned your username password below
            Username: ${username} Password: ${password}`

        const loginSuccessfulEmail = {
          from: 'dineshkumar2001jan@gmail.com',
          to: email,
          subject: 'Registration successfull',
          text: mailTemplate
        }

        transporter.sendMail(loginSuccessfulEmail, (error, response) => {
          if(error){
            console.log('something fishyyy happend');
          }else{
            user.registerData(inputData, function(data){
              res.redirect('/login');
            });
          }
        })
      }
    })    
  },
  loginForm:(req, res) => {
    res.render('login');
  },
  loginDetails: (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    user.loginData(username, (data) => {
      if(data != ''){
        bcrypt.compare(password, data[0].password, (error, hash) => {
          if(error){
            res.send(error);
          }else if(hash){
            console.log('user can login now');
            req.session.username = username;
            req.session.password = password;
            req.session.role = data[0].role;  
            req.session.save();
            console.log(req.session);
            res.redirect('/');
          }else{
            console.log('password is incorrect');
            res.redirect('/login');
          }
        })
      }else{
        console.log('user is not found');
        res.redirect('/login');
      }
    })
  },
  logout:(req, res) => {
    req.session.destroy();
    res.redirect('/');
  },
  account:(req, res) => {
    res.render('account');
  },
  profile: (req, res) => {
    var username = req.session.username;
    console.log(username);
    user.profileDetails(username, (data) => {
      console.log(data);
      const userDetails = {
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        mobile: data[0].mobile,
        username: data[0].username,
        password: data[0].password
      };
      res.render('profile',{userDetails});
    })
  },
  updateProfile: (req, res) => {
    var fullname = req.body.name;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var username = req.body.username;
    var user_id = req.body.user_id;

    const inputData = {
      name: fullname,
      email: email,
      mobile: mobile,
      username: username
    };

    user.updateProfile(inputData,user_id, (data) => {
      res.redirect('/profile');
    })
  }
}