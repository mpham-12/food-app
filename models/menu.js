const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
	drinkName: {
		type: String,
		required: true
	},
	size: {
		type: String,
		enum: [ 'Regular', 'Large', 'Jumbo' ],
		required: true
	},
	sugarLevel: {
		type: String,
		enum: [ '0%', '30%', '50%', '80%', '100%' ],
		required: true
	},
	iceLevel: {
		type: String,
		enum: [ 'No Ice', 'Less Ice', 'Regular Ice', 'Extra Ice' ],
		required: true
	},
	milkType: {
		type: String,
		enum: [ 'Oat Milk', 'Soy Milk', 'Almond Milk', '2% Milk' ],
		default: '2% Milk'
	},
	toppings: {
		type: String,
		enum: [ 'None', 'Pearls', 'Brown Sugar Pearls', 'Grass Jelly', 'Coconut Jelly', 'Pudding' ]
	},
	price: {
		type: Number,
		required: true
	},
	image: {
		type: String
	},
	description: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Menu', MenuSchema);
