///
/// songqueue controller
/// /api/songqueues
///

var router = require('express').Router();
var _ = require('underscore');

// Models
var SongQueue = require('../models/songqueue');
var Song = require('../models/song');

//Organizing sockets
var socketsArray_songQueue = [];

function SongQueueController(io) {
    //Initializating sockets
    
    //When the server is initialized, an array containing sockets for all is generated.
    SongQueue.find(function(err, songqueues) {
            if (err)
                res.send(err);
    
            _.each(songqueues, function (sq){
                var newSongQueueSocket = io
                    .of('/' + sq._id)
                    .on('connection', function (socket) {
                        console.log("A user has connected to " + sq._id);
                    var constraints = {
                            that: 'only'
                        }
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

    // Posting a songqueue
    .post(function(req,res){

        var songqueue = new SongQueue();
        songqueue.name = req.body.name;

        songqueue.save(function(err, saved) {
            if(err)
                res.send(err);
            else {
                res.status(200).json({SUCCESS: {_id: saved.id, name:songqueue.name}});
                //creating socket for this songqueue
                var newSongQueueSocket = io
                    .of('/' + saved.id)
                    .on('connection', function (socket) {
                        console.log("A user has connected to " + saved.id);
                    var constraints = {
                            that: 'only'
                        }
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


        })

    // Get all songqueues
    .get(function(req, res) {

        SongQueue.find(function(err, songqueues) {
          if (err)
              res.send(err);

          res.json(songqueues);

        });
    });

    ///
    /// songqueues/id
    ///
    router.route('/:songqueueID')

        //Get one songqueue
        .get(function(req,res){
            SongQueue.findById(req.params.songqueueID, function(err,songqueue){
                if(err)
                    res.send(err);
                res.status(200).json(songqueue);
            });

           
        })

        //Update one songqueue
        .patch(function(req,res) {
            // TODO: use findByIdAndUpdate
            SongQueue.findById(req.params.songqueueID, function(err,songqueue){
                if(err)
                    res.send(err);
                songqueue.name = req.body.name;

                songqueue.save(function(err){
                    if(err)
                        res.send(err);

                    res.status(200).send('Song updated');
                });
            });
        })

        //Deleting songqueue
        .delete(function(req,res){
                        SongQueue.findById(req.params.songqueueID, function(err, songQueue) {
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
    /// songqueues/id/songs
    ///
    router.route('/:songqueueID/songs')

        // Posting a song in this songqueue
        .post(function(req,res){

            var song = new Song();
            song.name = req.body.name;
            song.songqueueID = req.params.songqueueID;

            song.save(function(err, saved) {
                if(err)
                    res.send(err);
                else
                    res.status(200).json({id: saved.id});
            });
        })


        // Get all songs from this songqueue
        .get(function(req, res) {

            //Query to get the songs
            var query = Song.find({});
            query.where('songqueueID', req.params.songqueueID);
            query.exec(function(err, songs) {
                if (err)
                    res.send(err);

                res.json(songs);
            });
        });

    ///
    /// songqueues/id/songs/id
    ///
    router.route('/:songqueueID/songs/:songID')

        //Get one songqueue
        .get(function(req,res){

            //Query to get the song
            var query = Song.find({});
            query.where('songqueueID', req.params.songqueueID);
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
            query.where('songqueueID', req.params.songqueueID);
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

        //Deleting songqueue
        .delete(function(req,res){
            Song.remove({
                _id: req.params.songID,
                songqueueID: req.params.songqueueID
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
