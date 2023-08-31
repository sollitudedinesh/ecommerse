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


// module.exports = app;

//functions
app.get('/login',(req, res) => {
  res.render('login');
});

app.post('/login_details',(req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  var qry = `select * from registration_table where username='${username}'`;
  
  db.query(qry, (err, result) => {
    if(err){
      
      res.send(err);
    }else{
      if(result != ''){
        bcrypt.compare(password, result[0].password, (error, hash) => {
          if(error){
            res.send(error);
          }else if(hash){
            console.log('user can login now');
            req.session.username = username;
            req.session.password = password;
            req.session.role = result[0].role;  
            req.session.save();
            console.log(req.session);
            res.redirect('/');
          }else{
            console.log('password is incorrect');
            res.redirect('/login');
          }
        })
      }else{
        console.log('user is not');
        res.redirect('/login');
      }
    }
  })
})

app.get('/', (req, res) => {
  
  if(req.session){    
    if(req.session.role == 2){
      var username = req.session.username;
      var password = req.session.password;
      var qry = `SELECT * from registration_table where username='${username}' and password='${password}'`;
      db.query(qry, (err, result) => {
        if(err){
          res.send(err);
        }else{
          res.render('home',{username});
        }
      })
    }else{
      var username = "Account";
      res.render('home',{username});
    }
  }else{
    res.render('home');
  }
  
});

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
app.get('/signup', (req, res) => {
  res.render('register');
})

app.get('/account', (req, res) => {
  res.render('account');
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})

app.get('/profile', (req, res) => {

  if(req.session.role){
    if(req.session.role == 2){
      var username = req.session.username;
      var password = req.session.password;

      var qry = `SELECT * from registration_table where username='${username}' and password='${password}'`;

      db.query(qry, (err, result) => {
        if(err){
          console.log('something went wrong');
        }else{
          const userDetails = {
            name: result.name,
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

app.post('/register', (req, res) => {
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
      const qry = `INSERT into registration_table (name,email,mobile,username,password) VALUES ('${name}','${email}','${mobile}','${username}','${hash}')`;

      db.query(qry, (err, result) => {
        if(err){
          res.send(err);
        }else{
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
             auth: {
                    user: 'dineshkumar2001jan@gmail.com',
                    pass: 'pxwsabobaplsrdzq'
                  }
          })

          const mailTemplate = `<div>
          <p>Your registration successfull now you can login with your username and password we mentioned your username password below</p>
          <p>Username: ${username}</p>
          <p>Password: ${password}</p>
          <div>`

          const loginSuccessfulEmail = {
            from: 'dineshkumar2001jan@gmail.com',
            to: email,
            subject: 'Registration successfull',
            template: mailTemplate
          }

          transporter.sendMail(loginSuccessfulEmail, (error, response) => {
            if(error){
              console.log('something fishyyy happend');
            }else{
              res.redirect('/login');
            }
          })
        }
      })
    }
  })
  
})


//server creation
const port = process.env.PORT || 3000;

app.listen(port,'localhost',(err, res) => {
  console.log('project is running now');
})