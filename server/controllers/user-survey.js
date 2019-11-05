'use strict';

const Joi           = require('joi');
const Models        = require('../../db/models');
const Survey        = Models.Survey;
const SurveyAnswer  = Models.SurveyAnswer;


class UserSurveyController {

  constructor() {
    this.store = this.store.bind(this);
  }

  evaluate(rawAnswers, owner) {
    let answers = rawAnswers.map(function (item) {
      item.points = 2;
      return item;
    });
    return answers;
  }

  getScore(answers) {
    let score = 0;
    answers.forEach(function (answer) {
      score += answer.points;
    });
    return score;
  }

  store (req, res, next) {
    var data = req.body;
    const validationSchema = {
      answers:      Joi.array().items(
        Joi.object({
          question:   Joi.string().required(),
          answer:     Joi.string().required()
        })
      ).required()
    };

    // Validata data.
    const result = Joi.validate(data, validationSchema);

    if (result.error) {
      res.status(400).send(result.error);
      return next();
    }

    const cleaned_data = result.value;
    let answers = this.evaluate(cleaned_data.answers);
    let score = this.getScore(answers);

    // User must only have one survey, so, first we have to delete all of them.
    // Then we have to create a new one.
    Survey
      .destroy({
        where: { user_id: req.params.userId },
        force: true
      })
      .then(function () {
        return Survey
          .create({
            score: score,
            user_id: req.params.userId,
            Answers: answers
          }, {
            include: [{
              model: SurveyAnswer,
              as: 'Answers'
            }]
          });
      })
      .then(function (survey) {
        res.json(survey.get({plain: true}));
      })
      .catch(function (err) {        
        res.status(400).send(err);
      })
      .finally(function () {
        next();
      });
  }

  get (req, res, next) {
    var survey = req.survey;
    res.json(survey.get({plain: true}));
    next();
  }

  remove (req, res, next) {
    var survey = req.survey;

    survey
      .destroy({ force: true })
      .then(function () {
        res.send('');
      })
      .catch(function () {
        res.status(400).send(err);
      })
      .finally(function () {
        next();
      });
  }

}

module.exports = new UserSurveyController();
