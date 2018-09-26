'use strict';
var auth = require("../helpers/auth");
var models = require('../../server/models/index');
var bcrypt = require('bcryptjs');

/**
 * Login with a particular delegate_type
 *
 * delegate_type String 
 * authentication Authentication 
 * returns Token
 **/


exports.loginPost = function (args, res, next) {

  var username = args.body.username;
  var password = args.body.password;

  models.delegates.findOne({
    where: { username: username.trim() }
  }).then(function (result) {
    if (result) {
      var passwordIsValid = bcrypt.compareSync(password.trim(), result.password);
      console.log("--  passwordIsValid --", passwordIsValid);
      if (passwordIsValid) {
        var tokenString = auth.issueToken(username, result.delegate_type);
        var response = { token: tokenString };
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(response));
      }
      else {
        var response = { message: "Error: Credentials incorrect" };
        res.writeHead(403, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(response));
      }
    }
    else {
      var response = { message: "Error: Credentials incorrect" };
      res.writeHead(403, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    }
  }).catch((err) => {
    console.log("--  error occured --", err);
    var response = { message: 'Error: Server error occured' };
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));
  });

};


/**
 * Logout from app
 *
 * returns Token
 **/
exports.logoutGet = function (args, res, next) {
  var response = { "token": null };
  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(response));
}


/**
 * signup with a particular role
 *
 * {
  "delegate_type": "user",
  "username": "username",
  "password": "password"
}

 * returns Token
 **/
exports.signupPost = function (args, res, next) {

  var username = args.body.username;
  var password = args.body.password;
  var delegate_type = args.body.delegate_type;
  var hashedPassword = bcrypt.hashSync(password.trim(), 8);

  models.delegates.findOrCreate({
    where: {
      username: username.trim()
    },
    defaults: { // set the default properties if it doesn't exist
      password: hashedPassword,
      delegate_type: delegate_type.trim()
    }
  }).then(function (result) {
    var delegate = result[0], // the instance of the delegate
      created = result[1]; // boolean stating if it was created or not
    if (created) { // new user created
      var tokenString = auth.issueToken(username, delegate_type);
      console.log("--  tokenString --", tokenString);
      var response = { token: tokenString };
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    }
    else {
      var response = { message: "Error: user already exists" };
      res.writeHead(403, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    }
  }).catch((err) => {
    console.log("--  error occured --", err);
    var response = { message: 'Error: Server error occured' };
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(response));
  });
}