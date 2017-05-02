var express = require('express'),
  _ = require('lodash'),
  config = require('./config'),
  jwt = require('jsonwebtoken');
mysql = require('./mysql');
md5 = require('md5');
bcrypt = require('bcrypt');

var app = module.exports = express.Router();

var connection = mysql.createDbConnection();

// Create a password salt
var salt = bcrypt.genSaltSync(10);

function createToken(email) {
  return jwt.sign({ email: email }, config.secret, { expiresIn: 60 * 60 * 24 * 7 });
}

app.post('/users', function (req, res) {

  if (!req.body.email || !req.body.password) {
    return res.status(400).send("You must send the email and the password!");
  }

  var connection = mysql.createDbConnection();
  connection.query("SELECT * from user WHERE email = '" + req.body.email + "'", function (err, rows, fields) {
    if (!err) {
      if (rows.length > 0) {
        return res.status(401).send("A user with that email already exists");
      }
      else {
        var token = createToken(req.body.email);

        var hash = bcrypt.hashSync(req.body.password, salt);
        var connection = mysql.createDbConnection();
        connection.query("INSERT INTO user (email, password) VALUES ('" + req.body.email + "', '" + hash + "')", function (err, rows, fields) {
          connection.end();
          if (!err) {
            console.log('Created new user in DB.');
            var resp = "sign up successfull";
            res.status(201).send({
              id_token: token, resp
            });
          }
          else {
            console.log('Error while performing Query.', err);
          }
        });
      }
    }
    else {
      console.log('Error while performing Query.', err);
    }
  });
  connection.end();
});


app.post('/sessions/create', function (req, res) {

  if (!req.body.email || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }

  var hash = bcrypt.hashSync(req.body.password, salt);

  var connection = mysql.createDbConnection();
  connection.query("SELECT * FROM user WHERE '" + req.body.email + "' AND '" + hash + "'", function (err, rows, fields) {
    connection.end();
    if (!err) {
      if (rows.length = 0) {
        return res.status(401).send({ message: "The email or password don't match", user: user });
      }
      else {
        console.log('Found existing user.');
        var token = createToken(req.body.email);
        res.status(201).send({
          id_token: token
        });
      }
    }
    else {
      console.log('Error while performing Query.', err);
    }
  });

});
