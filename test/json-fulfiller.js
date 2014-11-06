'use strict';

var Bluebird = require('bluebird');

function JSONFulfiller(options) {
  this.store = options.store;
}

module.exports = JSONFulfiller;

JSONFulfiller.prototype.bootstrap = function (contract) {
  this.contract = contract;

  return this.fulfilled();
};

JSONFulfiller.prototype.fulfilled = function () {
  var self = this;
  var user = {
    get: function () {
    
    },

    create: function (data) {
      data.id = 1;
      self.store.users.push(data);
      return Bluebird.resolve(data);
    }
  };

  return { user: user };
};
