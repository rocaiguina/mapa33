'use strict';

const app               = require('../index');

const chai              = require('chai');
const chaiHttp          = require('chai-http');
const expect            = require('chai').expect;

chai.use(chaiHttp);

describe('Land', function() {

  before(function () {
    return "";
  });

  describe('#get()', function() {
    it('expect return NOT FOUND when entity doesnt exists', function(done) {
      chai
        .request(app)
        .get('/api/land/-1')
        .end(function (err, res) {
          expect(res.statusCode).to.equals(404);
          done();
        });
    });

  });

});
