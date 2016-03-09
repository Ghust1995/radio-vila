///
/// songqueue controller
/// /api/songqueues
///

var router = require('express').Router()

// Models
var SongQueue = require('../models/songqueue')

///
/// /api/songquques
///
router.route('/')
		
	// Posting a songqueue
	.post(function(req,res){
		var songqueue = new SongQueue();
		
		//Logica para mandar os parametros
		//console.log(req.body.name);
		//songqueue.name = req.body.name;
		console.log("params");
		console.log(req.params);
		console.log("body");
		console.log(req.body);
		console.log("query");
		console.log(req.query);

		songqueue.save(function(err){
			if(err)
				res.send(err);

			res.json({ message: 'Songqueue created!'});
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
    		res.json(songqueue);
    	});

    })

    //Update one songqueue
    .put(function(req,res){
    	SongQueue.findById(req.params.songqueueID, function(err,songqueue){
    		if(err)
    			res.send(err);

    		//Logica para mandar os parametros
    		console.log(req.body.name);
			songqueue.name = req.body.name;


    		songqueue.save(function(err){
    			if(err)
    				res.send(err);

    			res.json({ message: 'Song updated'});
    		});
    	});
    })

    //Deleting songqueue
    .delete(function(req,res){
    	SongQueue.remove({
    		_id: req.params.songqueueID
    	}, function(err, songqueue){
    		if(err)
    			res.send(err);

    		res.json ({ message: 'Successfully deleted'});
    	});
    });

module.exports = router