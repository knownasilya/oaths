'use strict';

var test = require('tape');
var App = require('../');
var JSONFulfiller = require('./json-fulfiller');
var store = { users: [] };
var jsonFulfiller = new JSONFulfiller({
  store: store
});

test('init', function (t) {
  t.plan(3);

  var contracts = new App({
    user: {
      map: {
        username: 'user_name'
      },
      schema: function (Joi) {
        return {
          username: Joi.string().alphanum().min(3).max(30).required(),
          email: Joi.string().email()
        };
      },
      methods: {
        find: {
          arguments: [function (Joi) {
            return Joi.string().email();
          }]
        }
      }
    }
  }).fulfill(jsonFulfiller);

  t.ok(contracts.user, 'has user contract');
  t.ok(contracts.user.get, 'has user#get');

  contracts.user.create({
    username: 'bob',
    email: 'bob@gmail.com'
  }).then(function (data) {
    t.same(data, {
      id: 1,
      username: 'bob',
      email: 'bob@gmail.com'
    });
  });
});