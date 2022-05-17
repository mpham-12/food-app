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
			size: String,
			sugarLevel: String,
			iceLevel: String,
			milkType: String,
			topping: String,
			price: Number,
			image: String
		}
	]
});

module.exports = mongoose.model('Cart', CartSchema);
