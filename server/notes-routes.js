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

function writeToFile(path, email, notesData, dbData) {

    dbData[email].notesData = notesData;
      
    fs.writeFile(path, JSON.stringify(dbData), function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("The notes was saved to file!");
    }); 
}

//notes - save route
app.use('/notes', jwtCheck);

app.post('/notes', function(req, res) {

  var decoded = jswt.decode(req.headers.authorization.split(' ')[1]);

  if (!req.body.email) {
    return res.status(400).send("You must send the email of the user");
  }

  if (!req.body.notesData) {
    return res.status(400).send("You must send the notesData");
  }

  if(req.body.email != decoded.email) {
    return res.status(400).send("Token not authorized for email.");
  }

  var notesData = req.body.notesData;
  var email = req.body.email;

  writeToFile(path, email, notesData, dbData);

  res.status(201).send({
    email, notesData 
  }); 
});

//notes - get route
app.get('/notes', function(req, res) {

  var decoded = jswt.decode(req.headers.authorization.split(' ')[1]);

  if (!req.query.email) {
    return res.status(400).send("You must send the email of the user");
  }

  if(req.query.email != decoded.email) {
    return res.status(400).send("Token not authorized for email.");
  }

  var email = req.query.email;

  if(!dbData[email]) {
    return res.status(400).send("Not logged in.");
  }

  var notesData = dbData[email].notesData;

  res.status(201).send({
    email, notesData
  }); 
});




