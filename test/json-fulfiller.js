'use strict';

var Bluebird = require('bluebird');

function JSONFulfiller(options) {
  this.store = options.store;
}

module.exports = JSONFulfiller;

JSONFulfiller.prototype.bootstrap = function (contract) {
  this.contract = contract;

  return this.fulfilled;
};

JSONFulfiller.prototype.fulfilled = {
  user: {
    get: function () {
    
    },

    create: function (data) {
      data.id = 1;
      return Bluebird.resolve(data);
    }
  }
};
