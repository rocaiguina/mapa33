'use strict';

const app               = require('../index');
const models            = require('../db/models');
const Land              = models.Land;

const chai              = require('chai');
const chaiHttp          = require('chai-http');
const expect            = require('chai').expect;

chai.use(chaiHttp);

describe('Main', function () {
  before(function () {
    return models.sequelize.sync({force: true});
  });

  describe('Land', function() {

    before(function () {
      return Land.bulkCreate([
        {
          name: 'Santa Cruz',
          level: 'basic',               // basic, pledge, conserved
          status: 'new',                // new, denied, approved
          geom: null,
          location: '',
          entity: '',
          use_type: '',
          acquisition_type: '',
          year_acquisition: 2019,
          reason_conservation: ''
        },
        {
          name: 'Cochabamba',
          level: 'basic',               // basic, pledge, conserved
          status: 'new',                // new, denied, approved
          geom: null,
          location: '',
          entity: '',
          use_type: '',
          acquisition_type: '',
          year_acquisition: 2019,
          reason_conservation: ''
        }
      ]);
    });

    describe('#findAll()', function() {
      it('expect return OK with data rows', function(done) {
        chai
          .request(app)
          .get('/api/land/')
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
          .post('/api/land/')
          .send({})
          .end(function (err, res) {
            expect(res.statusCode).to.equals(400);
            done();
          });
      });

      it('expect return BAD_REQUEST when data are invalid', function(done) {
        chai
          .request(app)
          .post('/api/land/')
          .send({
            name: '',
            level: 'another',
            status: 'updated',
            geom: {
              type: [],
              coordinates: ''
            },
            location: '',
            entity: '',
            use_type: '',
            acquisition_type: '',
            year_acquisition: 'ABCD',
            reason_conservation: ''
          })
          .end(function (err, res) {
            expect(res.statusCode).to.equals(400);
            done();
          });
      });

      it('expect return OK when data are valid', function(done) {
        chai
          .request(app)
          .post('/api/land/')
          .send({
            name: 'Santa Cruz',
            level: 'basic',               // basic, pledge, conserved
            status: 'new',                // new, denied, approved
            geom: {
              type: 'Polygon',
              coordinates: [ 
                [
                  [100.0, 0.0],
                  [101.0, 0.0],
                  [101.0, 1.0],
                  [100.0, 1.0],
                  [100.0, 0.0]
                ]
              ]
            },
            location: 'Bolivia',
            entity: 'UNE',
            use_type: 'option1',
            acquisition_type: 'natural',
            year_acquisition: 2019,
            reason_conservation: 'Some reason.'
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
          .put('/api/land/1')
          .send({})
          .end(function (err, res) {
            expect(res.statusCode).to.equals(400);
            done();
          });
      });

      it('expect return BAD_REQUEST when data are invalid', function(done) {
        chai
          .request(app)
          .put('/api/land/1')
          .send({
            name: '',
            level: 'another',
            status: 'updated',
            geom: {
              type: [],
              coordinates: ''
            },
            location: '',
            entity: '',
            use_type: '',
            acquisition_type: '',
            year_acquisition: 'ABCD',
            reason_conservation: ''
          })
          .end(function (err, res) {
            expect(res.statusCode).to.equals(400);
            done();
          });
      });

      it('expect return NOT_FOUND when data are valid and entity does NOT exists', function(done) {
        chai
          .request(app)
          .put('/api/land/-1')
          .send({
            name: 'Santa Cruz',
            level: 'basic',               // basic, pledge, conserved
            status: 'new',                // new, denied, approved
            geom: {
              type: 'Polygon',
              coordinates: [ 
                [
                  [100.0, 0.0],
                  [101.0, 0.0],
                  [101.0, 1.0],
                  [100.0, 1.0],
                  [100.0, 0.0]
                ]
              ]
            },
            location: 'Bolivia',
            entity: 'UNE',
            use_type: 'option1',
            acquisition_type: 'natural',
            year_acquisition: 2019,
            reason_conservation: 'Some reason.'
          })
          .end(function (err, res) {
            expect(res.statusCode).to.equals(404);
            done();
          });
      });

      it('expect return OK when data are valid and entity exists', function(done) {
        chai
          .request(app)
          .put('/api/land/1')
          .send({
            name: 'Santa Cruz',
            level: 'basic',               // basic, pledge, conserved
            status: 'new',                // new, denied, approved
            geom: {
              type: 'Polygon',
              coordinates: [ 
                [
                  [100.0, 0.0],
                  [101.0, 0.0],
                  [101.0, 1.0],
                  [100.0, 1.0],
                  [100.0, 0.0]
                ]
              ]
            },
            location: 'Bolivia',
            entity: 'UNE',
            use_type: 'option1',
            acquisition_type: 'natural',
            year_acquisition: 2019,
            reason_conservation: 'Some reason.'
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
          .get('/api/land/-1')
          .end(function (err, res) {
            expect(res.statusCode).to.equals(404);
            done();
          });
      });

      it('expect return entity data', function(done) {
        chai
          .request(app)
          .get('/api/land/1')
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
          .del('/api/land/-1')
          .end(function (err, res) {
            expect(res.statusCode).to.equals(404);
            done();
          });
      });

      it('expect return OK when entity has been removed', function(done) {
        chai
          .request(app)
          .del('/api/land/2')
          .end(function (err, res) {
            expect(res.statusCode).to.equals(200);
            done();
          });
      });
    });

  });

}); 
