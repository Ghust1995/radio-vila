var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongQueueSchema = new Schema({
	name: String
})

module.exports = mongoose.model('SongQueue', SongQueueSchema);

