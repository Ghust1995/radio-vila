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
        done();
      })
  });
  it('should list a SINGLE songQueue on /songQueue/<id> GET');
  it('should add a SINGLE songQueue on /songQueue POST');
  it('should delete a SINGLE songQueue on /songQueue/<id> DELETE');
});
