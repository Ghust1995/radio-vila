var Express = require('express');
var _ = require ("underscore")
var mongoose = require('mongoose');
var bodyParser = require ("body-parser");

var Server = new Express();
var router = Express.Router();


var SongQueue = require('./models/songqueue')

//Database settings

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Database connected");
});

//Database models


//Setup Port

var port = process.env.PORT || 8080;

//Setup Router

Server.set('views',  __dirname + '/views');


//Setting config.
Server.use(Express.static(__dirname + '/views'));
Server.use(Express.static(__dirname + '/public'));
Server.use(bodyParser.json());
Server.use(bodyParser.urlencoded());



router.route('/api')
        
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





router.get('/', function(req, res){
    res.sendFile('index.html');
})



Server.use('/', router);
//Server.use('/api/songqueues', require('./controllers/songqueues'))


// START THE SERVER
// =============================================================================
Server.listen(port);
console.log('Magic happens on port ' + port);


