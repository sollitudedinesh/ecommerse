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

// const multer = require('multer');

const upload = require('express-fileupload');

const userRouter = require('./routes/user.routes');

const commonRouter = require('./routes/Common_routes');

const adminRouter = require('./routes/admin.routes'); 





//middleware
const app = express();

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({ extended:true }));

app.use(bodyParser.json());

const oneDay = 1000 * 24 * 60 * 60;

app.use(session({
  secret: "myprojectecommerse",
  saveUninitialized: true,
  cookie: {maxage: oneDay},
  resave: false
}));

app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(upload());

app.use('/', userRouter);

app.use('/', commonRouter);

app.use('/', adminRouter);


module.exports = app;

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
});