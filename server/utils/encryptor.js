'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  encrypt: function(text) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(text, salt);
  },
  compare: function(text, hash) {
    return bcrypt.compareSync(text, hash);
  },
};
