const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	menuItems: [
		{
			type: Schema.Types.Mixed,
			ref: 'Menu'
		}
	],
	customerId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	orderedAt: {
		type: timeStamp
	}
});
