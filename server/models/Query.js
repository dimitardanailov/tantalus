const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuerySchema = new Schema({
	'applicationId': String,
	'parseQuery': String,
	'progress': {
		'type': String,
		'percent': Number
	}
});

export default QuerySchema;