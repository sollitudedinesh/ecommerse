const app = require('./app.js');

//server creation
const port = process.env.PORT || 3000;

app.listen(port,'localhost',(err, res) => {
  console.log('project is running now');
});