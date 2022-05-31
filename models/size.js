const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SizeSchema = new Schema({
	size: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}

});

module.exports = mongoose.model('Size', SizeSchema);