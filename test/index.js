'use strict';

var test = require('tape');
var JSONOath = require('../lib/json-oath');
var store = { users: [] };

test('init', function (t) {
  t.plan(4);

  var User = new JSONOath('user', {
    store: store.users,
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
        args: [function (Joi) {
          return Joi.string().email();
        }]
      }
    }
  });

  t.ok(User, 'has user contract');
  t.ok(User.find, 'has user#find');

  User.create({
    username: 'bob',
    email: 'bob@gmail.com'
  }).then(function (data) {
    t.same(data, {
      id: 1,
      user_name: 'bob',
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
