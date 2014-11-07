'use strict';

var util = require('util');
var Bluebird = require('bluebird');
var Oath = require('./index');

function JSONOath(name, options) {
  Oath.call(this, name, options);
}

util.inherits(JSONOath, Oath);
module.exports = JSONOath;

JSONOath.prototype.create = function (data) {
  var mapped = this.mapper(data);

  mapped.id = 1;
  this.store.push(mapped);
  return Bluebird.resolve(mapped);
};
