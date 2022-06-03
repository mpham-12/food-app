const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	customerId: {
				type: Schema.Types.ObjectId,
		ref: 'User'
	},
	orderItems: [
		{
			drinkName: String,
			quantity: Number,
			drinkId: mongoose.ObjectId,
			size: Array,
			sugarLevel: String,
			iceLevel: String,
			milkType: Array,
			topping: Array,
			image: String
		}
	],
	total: Number,
	orderedAt: {
		type: Date,
		default: Date.now
	},
	isActive: {
		type: Boolean,
		default: true
	}
});

module.exports = mongoose.model('Order', OrderSchema);
