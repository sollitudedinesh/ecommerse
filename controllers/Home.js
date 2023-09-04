const common_model = require('../models/Common_model');


module.exports={
  homePage:(req, res) => {
    if(req.session){
      if(req.session.role == 2){
        var username = req.session.username;
        var password = req.session.password;

        const inputData = {
          username: username,
          password: password
        };

        common_model.homePage(inputData, (data) => {
          if(data){
            res.render('home',{username});
          }
        })
      }else{
        var username = "Account";
        res.render('home',{username});
      }
    }else{
      res.redirect('/home');
    }
  }
}

