'use strict';

module.exports = {
  getErrors: function (details) {
    let errors = {};

    details.forEach(function (item, index) {
      errors[item.context.key] = {
        message: item.message,
        value: item.context.value
      };
    });

    return errors;
  }
}
