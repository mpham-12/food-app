const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToppingSchema = new Schema({
	toppingName: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}

});

module.exports = mongoose.model('Topping', ToppingSchema);
