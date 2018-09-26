'use strict';
var models = require('../../server/models/index');

/**
 * Protected endpoint, only accessible to 'superdelegates'
 *
 * delegate_address String delegate_address of delegate
 * returns DelegateAdminView
 **/
exports.delegateGet = function (args, res, next) {
  var delegate_address = args.swagger.params.delegate_address.value;
  console.log("--delegate_address--", delegate_address)

  models.delegates.find({
    where: {
      delegate_address: delegate_address
    }
  }).then(function (delegates) {
    if (delegates) {
      console.log("--delegates--", delegates)
      var response = delegates;
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    }
  });
}


/**
 * Protected endpoint, only accessible to 'superdelegates'
 *
 * returns ArrayOfDelegate
 **/
exports.delegatesGet = function (args, res, next) {
  models.delegates.findAll().then(function (delegates) {
    if (delegates) {
      console.log("--delegates--", delegates)
      var response = delegates;
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    }
  });
}


/**
 * Protected endpoint, only accessible to 'superdelegates'
 *
 * delegate_address String delegate_address of delegate
 * returns Message
 **/
exports.removedelegateDelete = function (args, res, next) {
  var delegate_address = args.swagger.params.delegate_address.value;

  models.delegates.destroy({
    where: {
      delegate_address: delegate_address //this will be your id that you want to delete
    }
  }).then(function (rowDeleted) {
    if (rowDeleted === 1) {
      console.log('Deleted successfully');
      var response = { message: 'Delegate deleted.' };
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(response));
    }
  });
}

/**
 * Protected endpoint, only accessible to 'superdelegates'
 *
 * body DelegateAdminView enter details to update
 * returns Message
 **/
exports.updatedelegatePut = function (args, res, next) {
  var delegate_address = args.swagger.params.delegate_address.value;
  console.log("--delegate_address--", delegate_address)

  models.delegates.find({
    where: {
      delegate_address: delegate_address
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