'use strict';

const Joi = require('joi');
const Paginator = require('paginator');
const Sequelize = require('sequelize');
const Models = require('../../db/models');
const Land = Models.Land;
const Memory = Models.Memory;
const User = Models.User;
const Op = Sequelize.Op;
const Validator = require('../utils/validator');

const Constants = require('../../config/constants');

class MemoryAdminController {
  findAll(req, res, next) {
    let options = {
      page: req.query.page || 1,
      paginate: req.query.limit || 10,
      where: {},
      include: [
        {
          model: Land,
          as: 'land',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
        },
      ],
    };
    let filters = {};

    if (req.query.status) {
      options.where.status = req.query.status;
      filters.status = req.query.status;
    }

    if (req.query.q) {
      options.where.title = {
        [Op.iLike]: '%' + req.query.q + '%',
      };
      filters.q = req.query.q;
    }

    Memory.paginate(options)
      .then(function(data) {
        let paginator = new Paginator(options.paginate, 5).build(
          data.total,
          options.page
        );
        data.current_page = paginator.current_page;
        data.next_page = paginator.next_page;
        data.previous_page = paginator.previous_page;
        data.has_previous_page = paginator.has_previous_page;
        data.has_next_page = paginator.has_next_page;
        res.render('memory/index', { paginator: data, filters });
      })
      .catch(function(err) {
        next(err);
      });
  }

  save(req, res) {
    var memory = req.memory;
    var data = req.body;

    const validationSchema = {
      status: Joi.string().allow(null, ''),
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (result.error) {
      // Add error flash messages.
      req.flash('error', 'Datos inválidos. Por favor verifica los datos.');
      req.flash('field_errors', Validator.getErrors(result.error.details));
      return res.redirect(
        '/admin/memory/' + (memory.isNewRecord ? '-1' : memory.id)
      );
    }

    const cleaned_data = result.value;

    memory.status = cleaned_data.status;
    memory
      .save()
      .then(function() {
        req.flash('success', 'Your data has been saved.');
      })
      .catch(function(err) {
        console.error(err);
        req.flash('error', err.message);
      })
      .finally(function() {
        res.redirect('/admin/memory/' + memory.id);
      });
  }

  get(req, res) {
    let memory = req.memory.get({ plain: true });
    const status = Constants.MEMORY_STATUS_LIST;
    res.render('memory/form', {
      object: memory,
      status,
    });
  }

  remove(req, res, next) {
    var memory = req.memory;

    memory
      .destroy()
      .then(function() {
        res.redirect('/admin/memory');
      })
      .catch(function(err) {
        next(err);
      });
  }
}

module.exports = new MemoryAdminController();
