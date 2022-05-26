const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT = 10;


const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	previousOrders: [
		{
			type: Schema.Types.Mixed,
			Ref: 'Orders'
		}
	]
});

module.exports = mongoose.model('User', UserSchema);
