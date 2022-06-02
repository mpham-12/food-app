const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
	customerId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	cartItems: [
		{
			drinkName: String,
			quantity: Number,
			drinkId: mongoose.ObjectId,
			size: {
				type: Schema.Types.Mixed,
				ref: 'Size',
			},
			sugarLevel: String,
			iceLevel: String,
			milkType: {
				type: Schema.Types.Mixed,
				ref: 'Milk',
			},
			topping: [{
				type: Schema.Types.ObjectId,
				ref: 'Topping',
			}],
			image: String
		}
	]
});

module.exports = mongoose.model('Cart', CartSchema);
