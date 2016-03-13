var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = new Schema({
	title: String,
	user: {
		id: String,
		name: String,
		url: String,
	},
	playerInfo: {
		id: String,
		type: String,
		url: String,
	},
	songqueue:{
		id: String,
		url: String,
	},
	rating: Integer,
});

module.exports = mongoose.model('Song', SongSchema);
