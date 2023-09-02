'use strict';

const user = require('../model/user.model');

exports.create = (req, res) => {
  const new_user = new user(req.body);

  user.create(new_user, (err, user) => {
    if(err){
      console.log('something went wrong');
    }else{
      res.redirect('/login');
    }
  })
}