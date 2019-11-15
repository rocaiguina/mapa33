'use strict';

const app               = require('../index');
const models            = require('../db/models');
const User              = models.User;

const chai              = require('chai');
const chaiHttp          = require('chai-http');
const expect            = require('chai').expect;

chai.use(chaiHttp);

describe('Main', function () {
  before(function () {
    return models.sequelize.sync({force: true});
  });

  describe('User', function() {

    before(function () {
      return User.bulkCreate([
        {
          first_name: 'Tete',
          last_name: 'Novoa',
          email: 'tnovoa@do.cpm',
          password: 'Tete123'
        },
        {
          first_name: 'Leo',
          last_name: 'Jimenez',
          email: 'ljimenez@do.cpm',
          password: 'Leo123a'
        }
      ]);
    });

    describe('#findAll()', function() {
      it('expect return OK with data rows', function(done) {
        chai
          .request(app)
          .get('/api/user/')
          .end(function (err, res) {
            expect(res.statusCode).to.equals(200);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.not.have.lengthOf(0);
            done();
          });
      });
    });

    describe('#store()', function() {
      it('expect return BAD_REQUEST when data are empty', function(done) {
        chai
          .request(app)
          .post('/api/user/')
          .send({})
          .end(function (err, res) {
            expect(res.statusCode).to.equals(400);
            done();
          });
      });

      it('expect return BAD_REQUEST when data are invalid', function(done) {
        chai
          .request(app)
          .post('/api/user/')
          .send({
            first_name: '',
            last_name: 'ASOIN',
            email: 'tnovoa@do.cpm',
            password:''
          })
          .end(function (err, res) {
            expect(res.statusCode).to.equals(400);
            done();
          });
      });

      it('expect return OK when data are valid', function(done) {
        chai
          .request(app)
          .post('/api/user/')
          .send({
              first_name: 'Donald',
              last_name: 'Duck',
              email: 'dduck@sdf.dd',
              password: 'Donald123'
          })
          .end(function (err, res) {
            expect(res.statusCode).to.equals(200);
            expect(res.body).to.have.property('id');
            done();
          });
      });
    });

    describe('#update()', function() {
      it('expect return BAD_REQUEST when data are empty', function(done) {
        chai
          .request(app)
          .put('/api/user/1')
          .send({})
          .end(function (err, res) {
            expect(res.statusCode).to.equals(400);
            done();
          });
      });

      it('expect return BAD_REQUEST when data are invalid', function(done) {
        chai
          .request(app)
          .put('/api/user/1')
          .send({
              first_name:'',
              last_name:'',
              password:''
          })
          .end(function (err, res) {
            expect(res.statusCode).to.equals(400);
            done();
          });
      });

      it('expect return NOT_FOUND when data are valid and entity does NOT exists', function(done) {
        chai
          .request(app)
          .put('/api/user/-1')
          .send({
              first_name: 'Leo',
              last_name: 'Jimenez',
              password: 'Leo123'
          })
          .end(function (err, res) {
            expect(res.statusCode).to.equals(404);
            done();
          });
      });

      it('expect return OK when data are valid and entity exists', function(done) {
        chai
          .request(app)
          .put('/api/user/1')
          .send({
              first_name: 'Tete',
              last_name: 'Novoa',
              password: 'Novoa1234'
          })
          .end(function (err, res) {
            expect(res.statusCode).to.equals(200);
            done();
          });
      });    
    });

    describe('#get()', function() {
      it('expect return NOT_FOUND when entity doesnt exists', function(done) {
        chai
          .request(app)
          .get('/api/user/-1')
          .end(function (err, res) {
            expect(res.statusCode).to.equals(404);
            done();
          });
      });

      it('expect return entity data', function(done) {
        chai
          .request(app)
          .get('/api/user/1')
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
          .del('/api/user/-1')
          .end(function (err, res) {
            expect(res.statusCode).to.equals(404);
            done();
          });
      });

      it('expect return OK when entity has been removed', function(done) {
        chai
          .request(app)
          .del('/api/user/2')
          .end(function (err, res) {
            expect(res.statusCode).to.equals(200);
            done();
          });
      });
    });

  });

}); 
