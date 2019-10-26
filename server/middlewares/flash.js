/*!
 * express-flash
 * Copyright(c) 2012 RGBboy <me@rgbboy.com>
 * MIT Licensed
 */

/**
 * Module Dependencies
 */

var connectFlash = require('connect-flash')();

/**
 * Return a middleware function
 *
 * @return {Function} middleware function
 * @api public
 */
exports = module.exports = function () {

  return function (req, res, next) {
    connectFlash(req, res, function () {
      // Proxy the render function so that the flash is
      // retrieved right before the render function is executed
      var render = res.render;
      res.render = function () {
        // attach validation error fields.
        res.locals.field_errors = req.flash('field_errors').shift();

        // attach flash messages to res.locals.messages
        let messages = [];
        req.flash('info').forEach(function (value) {
          messages.push({ type: 'info', content: value });
        });
        req.flash('success').forEach(function (value) {
          messages.push({ type: 'success', content: value });
        });
        req.flash('warning').forEach(function (value) {
          messages.push({ type: 'warning', content: value });
        });
        req.flash('error').forEach(function (value) {
          messages.push({ type: 'danger', content: value });
        });
        res.locals.messages = messages;

        render.apply(res, arguments);
      }
      next();
    })
  };

};

/**
 * Library version.
 */

exports.version = '0.0.2';