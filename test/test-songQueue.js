process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../server');
var SongQueue = require('../models/songqueue');

var should = chai.should();

chai.use(chaiHttp);

describe('SongQueue', function() {
  var url = '/api/songQueues/';

  beforeEach(function(done) {
    var newSongQueue = new SongQueue({
      name: 'Pre'
    });

    newSongQueue.save(function(err) {
      done();
    });
  });
  afterEach(function(done) {
    SongQueue.collection.drop();
    done();
  });

  it('should list ALL songQueues on /songQueue GET', function(done) {
    chai.request(server)
      .get(url)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal("Pre");
        done();
      })
  });

  it('should list a SINGLE songQueue on /songQueue/<id> GET', function(done) {
    var newSongQueue = new SongQueue({
      name: 'New',
    });
    newSongQueue.save(function(err, data) {
      chai.request(server)
        .get(url + data.id)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body._id.should.equal(data.id);
          res.body.should.have.property('name');
          res.body.name.should.equal("New");
          done();
        })
    })

  });
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
  it('should delete a SINGLE songQueue on /songQueue/<id> DELETE', function(done) {
    console.log("abc")
    chai.request(server)
    .get(url)
    .end(function(err, res){
      chai.request(server)
        .delete(url + res.body[0]._id)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('DELETED');
          console.log(response.body);
          response.body.DELETED.should.be.a('object');
          response.body.DELETED.should.have.property('name');
          response.body.DELETED.should.have.property('_id');
          response.body.DELETED.name.should.equal('Pre');
          done();
      });
    });
  });
});
