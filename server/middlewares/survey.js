'use strict';

const Models        = require('../../db/models');
const Survey        = Models.Survey;
const SurveyAnswer  = Models.SurveyAnswer;

module.exports = {
  lookup: function (req, res, next) {
    Survey
      .findOne({
        where: { user_id: req.params.userId },
        include: [
         { model: SurveyAnswer, as: 'Answers' }
        ]
      })
      .then(function (survey) {
        if (!survey) { return res.status(404).send(''); }

        req.survey = survey
        next();
        return survey;
      })
      .catch(function (err) {
        res.status(400).send(err);
      });
  }
};
