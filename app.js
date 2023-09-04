//modules
const express = require('express');

const db = require('./db/db.js');

const fs = require('fs');

const bodyParser = require('body-parser');

const ejs = require('ejs');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');

const userRouter = require('./routes/user.routes');

const commonRouter = require('./routes/Common_routes');





//middleware
const app = express();

app.use(express.static('assets'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

const oneDay = 1000 * 24 * 60 * 60;

app.use(session({
  secret: "myprojectecommerse",
  saveUninitialized: true,
  cookie: {maxage: oneDay},
  resave: false
}));

app.use(cookieParser());

app.set('view engine', 'ejs');

app.use('/', userRouter);

app.use('/', commonRouter);


// module.exports = app;

//functions

app.get('/api/v1/sessionDetails',(req, res) => {
  if(req.session.role){
    if(req.session.role == 2){
      var username = req.session.username;
      var role = req.session.role;

      var qry = `SELECT * from registration_table where username='${username}'`;

      db.query(qry, (err, result) => {  
        if(err){
          console.log('we are in trouble error is here');
        }else{
          var sessionDetails = {
            name: result[0].name,
            email: result[0].email,
            mobile: result[0].mobile,
            username: username,
            role: role,
          }
          res.send(sessionDetails);
        }
      })
      
    }
  }else{
    var sessionDetails = {
      username: 'Account',
      role: 0
    }
    res.send(sessionDetails);
  }
})

app.get('/profile', (req, res) => {

  if(req.session.role){
    if(req.session.role == 2){
      var username = req.session.username;
      var password = req.session.password;

      var qry = `SELECT * from registration_table where username='${username}'`;
      db.query(qry, (err, result) => {
        if(err){
          console.log('something went wrong');
        }else{
           const userDetails = {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
            mobile: result[0].mobile,
            username: result[0].username,
            password: result[0].password,
          };
          res.render('profile',{userDetails});
        }
      })
    }else{
      res.redirect('/login');
    }
  }else{
    res.redirect('/login');
  }
})

app.post('/updateProfile',(req, res) => {
  var fullname = req.body.name;
  var email = req.body.email;
  var mobile = req.body.mobile;
  var username = req.body.username;
  var user_id = req.body.user_id;

  var qry = `UPDATE registration_table set name='${fullname}',email='${email}',mobile='${mobile}',username='${username}' where id='${user_id}'`;

  db.query(qry, (err, result) => {
    if(err){
      console.log('something went wrong');
    }else{
      res.redirect('/profile')
    }
  })
});


//server creation
const port = process.env.PORT || 3000;

app.listen(port,'localhost',(err, res) => {
  console.log('project is running now');
})