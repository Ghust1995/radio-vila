///
/// songQueue controller
/// /api/songQueues
///

var router = require('express').Router();
var _ = require('underscore');

// Models
var SongQueue = require('../models/songQueue');
var Song = require('../models/song');

var BASE_URL = 'http://localhost:8080/api';
function GenerateUrl(params) {
  var ret = BASE_URL +
         (_.isUndefined(params.songQueue) ? ""
         : "/songQueues/" + params.songQueue + (
            _.isUndefined(params.song) ? ""
            : "/songs/" + params.song + (
              _.isUndefined(params.vote) ? ""
              : "/votes/" + params.vote)));
  console.log(_.isUndefined(params.songQueue) ? "UNDEFINED": params.songQueue);
  console.log(ret);
  return ret;

}

//Organizing sockets
var socketsArray_songQueue = [];

function SongQueueController(io) {
    //Initializating sockets

    //When the server is initialized, an array containing sockets for all is generated.
    SongQueue.find(function(err, songQueues) {
            if (err)
                res.send(err);

            _.each(songQueues, function (sq){
                var newSongQueueSocket = io
                    .of('/' + sq._id)
                    .on('connection', function (socket) {
                        console.log("A user has connected to " + sq._id);
                    var constraints = {
                            that: 'only'
                        };
                    constraints['/' + sq._id] = "will get";


                    //Logic
                    socket.emit('alerta', _.extend(constraints, {
                        name: "Server"
                    }));
                    socket.on('alerta-cliente', function(data){
                    console.log("Oie " + data.name);
                      });
                });

                socketsArray_songQueue.push(newSongQueueSocket);

                console.log("Socket for " + sq._id + " added. Element number: " + socketsArray_songQueue.length);


            });

        });




///
/// /api/songquques
///
    router.route('/')

    // Posting a songQueue
    .post(function(req,res){

        var songQueue = new SongQueue();
        songQueue.name = req.body.name;


        songQueue.save(function(err, saved) {
            if(err)
                res.send(err);
            else {
                songQueue.songs = {
                  url: GenerateUrl({
                    songQueue: saved.id,
                    song: "",
                  }),
                };
                console.log(songQueue);
                songQueue.save(function(err, saved) {
                    if(err)
                        res.send(err);
                    else {
                      res.status(200).json({SUCCESS: songQueue});
                      //creating socket for this songQueue
                      var newSongQueueSocket = io
                          .of('/' + saved.id)
                          .on('connection', function (socket) {
                              console.log("A user has connected to " + saved.id);
                          var constraints = {
                                  that: 'only'
                              };
                          constraints['/' + saved.id] = "will get";


                          //Logic
                          socket.emit('alerta', _.extend(constraints, {
                              name: "Server"
                          }));
                          socket.on('alerta-cliente', function(data){
                          console.log("Oie " + data.name);
                            });
                      });

                      socketsArray_songQueue.push(newSongQueueSocket);

                      console.log("Socket for " + saved.id + " added. Element number: " + socketsArray_songQueue.length);
              }
            });
          }
        });


        })

    // Get all songQueues
    .get(function(req, res) {

        SongQueue.find(function(err, songQueues) {
          if (err)
              res.send(err);

          res.json(songQueues);

        });
    });

    ///
    /// songQueues/id
    ///
    router.route('/:songQueueID')

        //Get one songQueue
        .get(function(req,res){
            SongQueue.findById(req.params.songQueueID, function(err,songQueue){
                if(err)
                    res.send(err);
                res.status(200).json(songQueue);
            });


        })

        //Update one songQueue
        .patch(function(req,res) {
            // TODO: use findByIdAndUpdate
            SongQueue.findById(req.params.songQueueID, function(err,songQueue){
                if(err)
                    res.send(err);
                songQueue.name = req.body.name;

                songQueue.save(function(err){
                    if(err)
                        res.send(err);

                    res.status(200).send('Song updated');
                });
            });
        })

        //Deleting songQueue
        .delete(function(req,res){
                        SongQueue.findById(req.params.songQueueID, function(err, songQueue) {
                            if(err) {
                                res.json({ERROR: err});
                            }
                            else {
                                songQueue.remove(function(err) {
                                    if(err) {
                                        res.json({ERROR: err});
                                    }
                                    else {
                                        res.json({DELETED: songQueue});
                                    }
                                });
                            }
                        });
        });

    ///
    /// songQueues/id/songs
    ///
    router.route('/:songQueueID/songs')

        // Posting a song in this songQueue
        .post(function(req,res){

            var song = new Song();
            song.title = req.body.title;
            song.songQueue.id = req.params.songQueueID;
            song.timeCreated = new Date().getTime();

            song.save(function(err, saved) {
                if(err)
                    res.send(err);
                else
                    res.status(200).json({id: saved.id});
            });
        })


        // Get all songs from this songQueue
        .get(function(req, res) {

            //Query to get the songs
            var query = Song.find({});
            query.where('songQueue.id', req.params.songQueueID);
            query.exec(function(err, songs) {
                if (err)
                    res.send(err);

                res.json(songs);
            });
        });

    ///
    /// songQueues/id/songs/id
    ///
    router.route('/:songQueueID/songs/:songID')

        //Get one songQueue
        .get(function(req,res){

            //Query to get the song
            var query = Song.find({});
            query.where('songQueue.id', req.params.songQueueID);
            query.where('_id', req.params.songID);
            query.exec(function(err, song) {
                if (err)
                    res.send(err);

                res.json(song);
            });
        })

        //Update one song
        .patch(function(req,res) {

            // TODO: use findByIdAndUpdate

            //Query to get the song
            var query = Song.findOne({});
            query.where('songQueueID', req.params.songQueueID);
            query.where('_id', req.params.songID);
            query.exec(function(err, song) {
                song.name = req.body.name;
                song.save(function(err){
                    if(err)
                        res.send(err);

                    res.status(200).send('Song updated');
                });
            });
        })

        //Deleting songQueue
        .delete(function(req,res){
            Song.remove({
                _id: req.params.songID,
                songQueueID: req.params.songQueueID
            }, function(err, deleted){
                if(err)
                    res.send(err);
                else
                    res.status(200).send('Song deleted');
            });
        });

    return router;
}

module.exports = SongQueueController;
