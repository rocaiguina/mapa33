'use strict';

const app               = require('../index');
const models            = require('../db/models');
const Survey            = models.Survey;
const User              = models.User;

const chai              = require('chai');
const chaiHttp          = require('chai-http');
const expect            = require('chai').expect;

chai.use(chaiHttp);

describe('Main', function () {
  before(function () {
    return models.sequelize.sync({force: true});
  });

  describe('Survey', function() {

    before(function () {
      return User.bulkCreate([
        {
          first_name: 'Mr.',
          last_name: 'Survey',
          email: 'survey@info.com',
          password: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    });

    describe('#store()', function() {
      it('expect return BAD_REQUEST when data are empty', function(done) {
        chai
          .request(app)
          .post('/api/user/1/survey')
          .send({})
          .end(function (err, res) {
            expect(res.statusCode).to.equals(400);
            done();
          });
      });

      it('expect return BAD_REQUEST when data are invalid', function(done) {
        chai
          .request(app)
          .post('/api/user/1/survey')
          .send({
            answers: "['This is not an array']"
          })
          .end(function (err, res) {
            expect(res.statusCode).to.equals(400);
            done();
          });
      });

      it('expect return OK when data are valid', function(done) {
        chai
          .request(app)
          .post('/api/user/1/survey')
          .send({
            answers: [
              {
                question: 'question_1',
                answer: 'option_a'
              },
              {
                question: 'question_2',
                answer: 'option_c'
              },
            ]
          })
          .end(function (err, res) {
            expect(res.statusCode).to.equals(200);
            expect(res.body).to.have.property('id');
            done();
          });
      });
    });

    describe('#get()', function() {
      it('expect return NOT_FOUND when entity doesnt exists', function(done) {
        chai
          .request(app)
          .get('/api/user/-1/survey')
          .end(function (err, res) {
            expect(res.statusCode).to.equals(404);
            done();
          });
      });

      it('expect return entity data', function(done) {
        chai
          .request(app)
          .get('/api/user/1/survey')
          .end(function (err, res) {
            expect(res.statusCode).to.equals(200);
            expect(res.body).to.have.property('id');
            done();
          });
      });
    });

    describe('#remove()', function() {
      it('expect return NOT_FOUND when entity doesnt exists', function(done) {
        chai
          .request(app)
          .del('/api/user/-1/survey')
          .end(function (err, res) {
            expect(res.statusCode).to.equals(404);
            done();
          });
      });

      it('expect return OK when entity has been removed', function(done) {
        chai
          .request(app)
          .del('/api/user/1/survey')
          .end(function (err, res) {
            expect(res.statusCode).to.equals(200);
            done();
          });
      });
    });

  });

}); 
