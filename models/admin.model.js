const db = require('../db/db.js');

module.exports={
  addCategory:(inputData, callback) => {
    var qry = "INSERT INTO category_master SET?";
    db.query(qry, inputData,(err, result) => {
      if(err){
        console.log(err);
      }else{
        return callback(result);
      }
    })
  },
  categoryCode:(callback) => {
    var qry = "SELECT COUNT(*) as count from category_master";
    db.query(qry, (err, result) => {
      if(err){
        console.log(err);
      }else{
        callback(result);
      }
    });
  },
  allCategory:(callback) => {
    var qry = "SELECT * from category_master where active_status='1'";
    db.query(qry, (err, result) => {
      if(err){
        console.log(err);
      }else{
        callback(result);
      }
    });
  },
  editCategory:(cat_id, callback) => {
    var qry = `SELECT * from category_master where id='${cat_id}'`;

    db.query(qry, (err, result) => {
      if(err){
        console.log(err);
      }else{
        callback(result);
      }
    })
  },
  updateCategory:(updateData, id, callback) => {
    var qry = `UPDATE category_master set ?`;

    db.query(qry, [updateData, id], (err, result) => {
      if(err){
        console.log(err);
        // res.redirect('/editCategory?id=');
      }else{
        callback(result);
      }
    })
  },
  deleteCategory:(updateData, id, callback) => {
    var qry = `UPDATE category_master set ?`;
     db.query(qry, [updateData, id], (err, result) => {
      if(err){
        console.log(err);
      }else{
        callback(result);
      }
     })
  },
  getProducts:(callback) => {
    var qry = `SELECT * from product_master where active_status='1'`;
    
    db.query(qry, (err, result) => {
      if(err){
        console.log(err);
      }else{
        callback(result);
      }
    })
  }
}