var Express = require('express');
var _ = require ("underscore");
var mongoose = require('mongoose');
var bodyParser = require ("body-parser");
var logger = require('morgan');
var config = require('./_config');



//Setting up the app
var app = new Express();
var router = Express.Router();


//Socket.io configurations
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Database settings
mongoose.connect(config.mongoURI[app.settings.env]);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Database connected");
});

//Setup Port
var port = process.env.PORT || 8080;
app.set('port', port);

//Setting config.
app.set('views',  __dirname + '/views');
app.use(Express.static(__dirname + '/views'));
app.use(Express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Setup router
router.get('/', function(req, res) {
    res.sendFile('index.html');
});
app.use('/api/songqueues', require('./controllers/songqueues')(io));

// START THE app
server.listen(app.get('port'), function(){
	console.log("Server listening to port" + app.get('port'));
});
console.log('Magic happens on port ' + port);

module.exports = server;
