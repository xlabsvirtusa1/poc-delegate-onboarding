'use strict';
var auth = require("../helpers/auth");
var models = require('../../server/models/index');

/**
 * register endpoint, only accessible to 'superdelegates' and 'delegates'
 *
 * body Delegate Delegate Onboard Model
 * returns Message
 **/
exports.registerPut = function (args, res, next) {
  var me = auth.me(args);
  var body = args.body;
  console.log("--me--", me.sub)
  console.log("--body--", body)

  models.delegates.find({
    where: {
      username: me.sub
    }
  }).then(function (delegates) {
    if (delegates) {
      delegates.updateAttributes(
        body
      ).then(function (delegates) {
        console.log("--delegates--", delegates)
        var response = { message: 'Delegate registered.' };
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(response));
      });
    }
  });
}


/**
 * Protected endpoint, only accessible to 'superdelegates' and 'delegates'
 *
 * delegate_address String delegate_address of delegate
 * returns Delegate
 **/
exports.statusGet = function (args, res, next) {
  var me = auth.me(args);
  console.log("--me--", me.sub)

  models.delegates.find({
    where: {
      username: me.sub
    }
  }).then(function (delegates) {
    if (delegates) {
      console.log("--delegates--", delegates)
      var response = { message: delegates.delegate_state };
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    }
  });
}

/**
 * unregister endpoint, only accessible to 'superdelegates' and 'delegates'
 *
 * returns Message
 **/
exports.unregisterPut = function (args, res, next) {
  var me = auth.me(args);
  console.log("--me--", me.sub)

  models.delegates.find({
    where: {
      username: me.sub
    }
  }).then(function (delegates) {
    if (delegates) {
      delegates.updateAttributes(
        {
          "delegate_state": "unregister"
        }
      ).then(function (delegates) {
        console.log("--delegates--", delegates)
        var response = { message: 'Delegate unregister.' };
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(response));
      });
    }
  });
}