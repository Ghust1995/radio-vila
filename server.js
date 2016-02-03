var Express = require('express');
var Server = new Express();

//Setup Port

var port = process.env.PORT || 8080;

//Setup Router

var router = Express.Router();
Server.set('views',  __dirname + '/views');

Server.use(Express.static(__dirname + '/public'));

router.get('/', function(req, res){
	res.render('index.jade');
})

Server.use('/', router)
// START THE SERVER
// =============================================================================
Server.listen(port);
console.log('Magic happens on port ' + port);