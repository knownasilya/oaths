'use strict';

var Joi = require('joi');
var Parky = require('parky');

module.exports = Oath;

function Oath(name, options) {
  this.resourceName = name;
  this.mapOptions = options.map;
  this.store = options.store;

  var parky = new Parky({
    keyMap: options.map,
    throwOnInvalid: true
  });

  this.mapper = parky.map.bind(parky);
}

Oath.prototype.find = function (id, callback) {
  throw 'Not implemented';
};

Oath.prototype.update = function (id, data, callback) {
  
  throw 'Not implemented';
};

Oath.prototype.create = function (data, callback) {
  throw 'Not implemented';
};

Oath.prototype.remove = function (id, callback) {
  throw 'Not implemented';
};
