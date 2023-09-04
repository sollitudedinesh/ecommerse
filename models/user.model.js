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
  }
}