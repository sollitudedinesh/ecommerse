'use strict';

const db = require('../db/db.js');

var user = (user) => {
  this.name = user.name;
  this.email = user.email;
  this.mobile = user.mobile;
  this.username = user.username;
  this.password = user.password;  
}

user.create = (newUser, result) => {
  var qry = `INSERT into registration_table set ?`;
  db.query(qry, newUser,(err, res) => {
    if(err){
      console.log('something went wrong');
    }else{
      console.log('created successfully');
    }
  });
};

module.exports = user;