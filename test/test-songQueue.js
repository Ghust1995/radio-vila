var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('SongQueue', function() {

  it('should list ALL songQueues on /songQueue GET', function(done) {
    chai.request(server)
      .get('/api/songQueues')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      })
  });

  it('should list a SINGLE songQueue on /songQueue/<id> GET');
  it('should add a SINGLE songQueue on /songQueue POST', function(done) {
    chai.request(server)
      .post('/api/songQueues')
      .send({name: 'TestQueue'})
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('_id');
        res.body.SUCCESS.should.have.property('name');
        res.body.SUCCESS.name.should.equal('TestQueue');

        done();
      })
  });
  it('should delete a SINGLE songQueue on /songQueue/<id> DELETE');
});
