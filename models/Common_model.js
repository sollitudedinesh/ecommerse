const db = require('../db/db.js');

module.exports={
  homePage:(input, callback) => {
    var qry = `SELECT * from registration_table where username='${input.username}' and password='${input.password}'`;

    db.query(qry, (err, data) => {
      if(err){
        console.log('Error exist');
      }else{
        return callback(data);
      }
    })
  }
}