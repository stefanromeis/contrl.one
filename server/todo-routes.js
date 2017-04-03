var express = require('express'),
    jwt     = require('express-jwt'),
    jswt    = require('jsonwebtoken');
    config  = require('./config'),
    quoter  = require('./quoter'),
    dbData  = require('./dbData'),
    _       = require('lodash');
    
var app = module.exports = express.Router();
var path = 'dbData.json';
var dbData = dbData;

var jwtCheck = jwt({
  secret: config.secret
});

function writeToFile(path, email, todoData, dbData) {

    dbData[email].todoData = todoData;
      
    fs.writeFile(path, JSON.stringify(dbData), function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The todo was saved to file!");
    }); 
}

//todo - save route
app.use('/todo', jwtCheck);

app.post('/todo', function(req, res) {

  var decoded = jswt.decode(req.headers.authorization.split(' ')[1]);

  if (!req.body.email) {
    return res.status(400).send("You must send the email of the user");
  }

  if (!req.body.todoData) {
    return res.status(400).send("You must send the todoData");
  }

  if(req.body.email != decoded.email) {
    return res.status(400).send("Token not authorized for email.");
  }

  var todoData = req.body.todoData;
  var email = req.body.email;

  writeToFile(path, email, todoData, dbData);

  res.status(201).send({
    email, todoData 
  }); 
});


app.get('/todo', function(req, res) {

  var decoded = jswt.decode(req.headers.authorization.split(' ')[1]);

  if (!req.query.email) {
    return res.status(400).send("You must send the email of the user");
  }

  if(req.query.email != decoded.email) {
    return res.status(400).send("Token not authorized for email.");
  }

  var email = req.query.email;

  /*
  if(!dbData[email]) {
    return res.status(400).send("No todo data available.");
  }
  */
  var todoData = dbData[email].todoData;

  res.status(201).send({
    email, todoData
  }); 
});




