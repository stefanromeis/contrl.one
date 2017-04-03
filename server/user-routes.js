var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('jsonwebtoken');
    fs      = require('fs');
    dbData  = require('./dbData');

var app = module.exports = express.Router();

// XXX: This should be a database of users :).
var users = [{
  id: 1,
  username: 'gonto',
  password: 'gonto'
}];

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
}

function getUserScheme(req) {
  
  var username;
  var type;
  var userSearch = {};

  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}


app.post('/users', function(req, res) {
  
  var userScheme = getUserScheme(req);  

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }

  console.log(' ');
  console.log('uname ', req.body.email);
  console.log(' ');

  if (_.find(users, userScheme.userSearch) || dbData[req.body.email]) {
   return res.status(401).send("A user with that email already exists");
  }

  var profile = _.pick(req.body, userScheme.type, 'password', 'extra');
  profile.id = _.max(users, 'id').id + 1;

  var token = createToken(profile);

  users.push(profile);
  writeToFile('dbData.json', profile, dbData);
  console.log(users);

  var resp = "sign up successfull";
  res.status(201).send({
    id_token: token, resp
  });
});

app.post('/sessions/create', function(req, res) {

  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }

  var user = _.find(users, userScheme.userSearch) || dbData[req.body.email];
  
  if (!user) {
    return res.status(401).send({message:"The email or password don't match", user: user});
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The email or password don't match");
  }

  writeToFile('dbData.json', user, dbData);
  
  var resp = "login successfull";
  res.status(201).send({
    resp, id_token: createToken(user)
  });
});

function writeToFile(path, profile, dbData) {

  console.log('writing to file. ', dbData);
  dbData[profile.email] = profile;

  fs.writeFile(path, JSON.stringify(dbData), function(err) {
      if(err) {
          return console.log(err);
      }
  }); 
}