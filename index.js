'use strict';

var Joi = require('joi');

module.exports = Contract;

function Contract(contract) {
  this.contracts = Object.keys(contract);
}

Contract.prototype.fulfill = function (fulfiller) {
  if (!fulfiller) {
    throw Error('Invalid fulfiller');
  }

  return fulfiller.bootstrap(this);
};
