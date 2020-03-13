'use strict';

module.exports = {
  admin_access: function(req, res, next) {
    if (req.user.role == 'administrator') {
      res.locals.user = req.user;
      return next();
    }
    if (req.xhr) {
      return next(new Error('Unauthorized'));
    }

    res.redirect('/admin/login');
  },
};
