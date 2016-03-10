///
/// songqueue controller
/// /api/songqueues
///

var router = require('express').Router();

// Models
var SongQueue = require('../models/songqueue');
var Song = require('../models/song');

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
			else
				res.status(200).json({id: saved.id});
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
    .put(function(req,res) {
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
    	SongQueue.remove({
    		_id: req.params.songqueueID
    	}, function(err, deleted){
    		if(err)
    			res.send(err);
    		else
    			res.status(200).send(deleted.id);
    	});
    });

module.exports = router;