'use strict';

const Joi           = require('joi');
const Paginator     = require('paginator');

const Models        = require('../../db/models');
const Land          = Models.Land;


class LandAdminController {
  findAll (req, res, next) {
    let options = {
      page: req.query.page || 1,
      paginate: req.query.limit || 10
    };

    Land
      .paginate(options)
      .then(function (data) {
        let paginator = new Paginator(options.paginate, 5).build(data.total, options.page);
        data.current_page = paginator.current_page;
        data.next_page = paginator.next_page;
        data.previous_page = paginator.previous_page;
        data.has_previous_page = paginator.has_previous_page;
        data.has_next_page = paginator.has_next_page;
        res.render('land/index', { paginator: data });
      })
      .catch(function (err) {
        next(err);
      });
  }

  create (req, res, next) {
    let context = {};
    res.render('land/form', context);
  }

  store (req, res, next) {
    res.redirect('/admin/land');
  }

  update (req, res, next) {
    res.redirect('/admin/land');
  }

  get (req, res, next) {
    res.render('land/form');
  }

  remove (req, res, next) {
    var land = req.land;

    land
      .destroy()
      .then(function () {
        res.redirect('/admin/land');
      })
      .catch(function (err) {
        next(err);
      });
  }
}

module.exports = new LandAdminController();
