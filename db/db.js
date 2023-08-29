const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecom_db'
});

connection.connect((err, res) => {
  if(err){
    console.log('Database connection error');
  }else{
    console.log('Connection successfully');
  }
});

module.exports = connection;