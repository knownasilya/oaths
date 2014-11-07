'use strict';

var Joi = require('joi');
var parky = require('parky');

module.exports = Oath;

function Oath(name, options) {
  this.name = name;
  this.mapOptions = options.map;
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
