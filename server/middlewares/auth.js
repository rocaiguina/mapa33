'use strict';

module.exports = {
  login_required: function (req, res, next) {
    if (req.user) {
      res.locals.user = req.user;
      return next();
    }

    if (req.xhr) {
      return next(new Error('Unauthorized'));
    }

    res.redirect('/admin/login');
  }
};
