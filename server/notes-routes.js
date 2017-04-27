var
  express = require('express'),
  jwt = require('express-jwt'),
  jswt = require('jsonwebtoken');
config = require('./config'),
  _ = require('lodash');
  mysql = require('./mysql');
  md5 = require('md5');

var app = module.exports = express.Router();
var connection = mysql.con;

var jwtCheck = jwt({
  secret: config.secret
});

//notes - save route
app.use('/notes', jwtCheck);

app.get('/notes', function (req, res) {

  var decoded = jswt.decode(req.headers.authorization.split(' ')[1]);

  if (!req.query.email) {
    return res.status(400).send("You must send the email of the user");
  }

  if (req.query.email != decoded.email) {
    return res.status(400).send("Token not authorized for email.");
  }

  var connection = mysql.createDbConnection();
  connection.query("SELECT notesData from user WHERE email = '" + req.query.email + "'", function (err, rows, fields) {
    connection.end();
    if (!err) {
      if (rows.length > 0) {
        var email = req.query.email;
        var notesData = rows[0].notesData;
        res.status(201).send({
          email, notesData
        });
      }
    }
    else {
      console.log('Error while performing Query.');
    }
  });
});

app.put('/notes', function (req, res) {

  var decoded = jswt.decode(req.headers.authorization.split(' ')[1]);

  if (!decoded.email) {
    return res.status(401).send("Token contains no E-Mail Data.");
  }

  if (!req.body.notesData) {
    return res.status(400).send("You must send the notesData");
  }

  var connection = mysql.createDbConnection();
  connection.query("UPDATE user SET notesData = '" + req.body.notesData + "' WHERE email = '" + decoded.email + "'", function (err, rows, fields) {
    connection.end();
    if (!err) {
      var email = decoded.email;
      var notesData = req.body.notesData;
      res.status(201).send({
        email, notesData
      });
    }
    else {
      console.log('Error while performing Query (Save notes).', err);
    }
  });
});







