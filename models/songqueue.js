var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongQueueSchema = new Schema({
	name: String,
	songs: {
		url: String,
	},
	users: {
		url: String,
	}
});

module.exports = mongoose.model('SongQueue', SongQueueSchema);
