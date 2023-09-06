const db = require('../db/db.js');

module.exports={
  registerData:(inputData, callback) => {
    var sql = 'INSERT INTO registration_table SET?';
    db.query(sql, inputData, (err, data) => {
      if(err){
        console.log(err);
      }else{
        return callback(data);
      }   
    })
  },
  loginData: (inputData, callback) => {
    var sql = `SELECT * from registration_table where username='${inputData}'`;
    db.query(sql, (err, data) => {
      if(err){
        console.log(err);
      }else{
        return callback(data);
      }
    })
  },
  profileDetails: (username, callback) => {
    var sql = `SELECT * from registration_table where username='${username}'`;
    console.log(sql);

    db.query(sql, (err, result) => {
      if(err){
        console.log('Something went wrong');
        result.redirect('/');
      }else{
        return callback(result);
      }
    })
  },
  updateProfile: (inputData,userId, callback) => {
    var sql = `UPDATE registration_table set ?`;
    db.query(sql,[inputData,userId], (err, data) => {
      if(err){
        console.log('Something went wrong');
        res.redirect('/');
      }else{
        return callback(data);
      }
    })
  },
}