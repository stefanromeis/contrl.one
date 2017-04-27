var express = require('express'),
  jwt = require('express-jwt'),
  jswt = require('jsonwebtoken');
config = require('./config'),
  _ = require('lodash');
mysql = require('./mysql');
md5 = require('md5');
bcrypt = require('bcrypt');

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: config.secret
});

//todo - save route
app.use('/todo', jwtCheck);

app.get('/todo', function (req, res) {

  var decoded = jswt.decode(req.headers.authorization.split(' ')[1]);

  if (!req.query.email) {
    return res.status(400).send("You must send the email of the user");
  }

  if (req.query.email != decoded.email) {
    return res.status(400).send("Token not authorized for email.");
  }

  var connection = mysql.createDbConnection();
  connection.query("SELECT todoData from user WHERE email = '" + req.query.email + "'", function (err, rows, fields) {
    connection.end();
    if (!err) {
      if (rows.length > 0) {
        var email = req.query.email;
        var todoData = rows[0].todoData;
        res.status(201).send({
          email, todoData
        });
      }
    }
    else {
      console.log('Error while performing Query.');
    }
  });
});

app.put('/todo', function (req, res) {

  var decoded = jswt.decode(req.headers.authorization.split(' ')[1]);

  if (!req.body.todoData) {
    return res.status(400).send("You must send the todoData");
  }

  if (!decoded.email) {
    return res.status(401).send("Token contains no E-Mail Data.");
  }
  
  var connection = mysql.createDbConnection();
  connection.query("UPDATE user SET todoData = '" + req.body.todoData + "' WHERE email = '" + decoded.email + "'", function (err, rows, fields) {
    connection.end();
    if (!err) {
      var email = decoded.email;
      var todoData = req.body.todoData;
      res.status(201).send({
        email, todoData
      });
    }
    else {
      console.log('Error while performing Query (Save ToDo).', err);
    }
  });
});







