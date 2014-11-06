'use strict';

var test = require('tape');
var App = require('../');
var JSONFulfiller = require('./json-fulfiller');
var store = { users: [] };
var jsonFulfiller = new JSONFulfiller({
  store: store
});

test('init', function (t) {
  t.plan(4);

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

    t.same(findById('users', 1, store), {
      id: 1,
      user_name: 'bob',
      email: 'bob@gmail.com'
    });
  });
});

function findById(table, id, store) {
  var results = store[table].filter(function (item) {
    return item.id === id;
  });

  if (results.length) {
    return results[0];
  }
}
