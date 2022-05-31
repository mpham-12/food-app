const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MilkSchema = new Schema({
	milkName: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}

});

module.exports = mongoose.model('Milk', MilkSchema);