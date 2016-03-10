var Express = require('express');
var _ = require ("underscore");
var mongoose = require('mongoose');
var bodyParser = require ("body-parser");

var Server = new Express();
var router = Express.Router();

//Database settings
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Database connected");
});

//Setup Port
var port = process.env.PORT || 8080;

//Setting config.
Server.set('views',  __dirname + '/views');
Server.use(Express.static(__dirname + '/views'));
Server.use(Express.static(__dirname + '/public'));
Server.use(bodyParser.json());
Server.use(bodyParser.urlencoded({extended: true}));

// Setup router
router.get('/', function(req, res) {
    res.sendFile('index.html');
});
Server.use('/api/songqueues', require('./controllers/songqueues'));

// START THE SERVER
// =============================================================================
Server.listen(port);
console.log('Magic happens on port ' + port);