var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = new Schema({
	title: String,
	rating: Number,
	url: String,
	timeCreated: Date,
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
	songQueue:{
		id: String,
		url: String,
	},
	votes: {
		url: String,
	},
});

module.exports = mongoose.model('Song', SongSchema);
