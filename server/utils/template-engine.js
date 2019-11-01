'use strict';

const Nunjucks = require('nunjucks');
Nunjucks.configure('views', { autoescape: true, noCache: true });

module.exports.render = function(template, context) {
  // Adds default vars like `base_url` into context.
  context = context || {};
  context.base_url = process.env.SERVER_URL;
  return Nunjucks.render(template, context);
};
