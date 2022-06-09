const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Menu = require('../models/menu');
const Order = require('../models/orders');

//Get admin page
router.get('/', async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id);
	if (id && user.isAdmin) {
		res.render('admin/home', {id, user});
	} else {
		res.redirect('back')
	}
});

//Get new form for creating drinks
router.get('/new', async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id);
	if (id && user.isAdmin) {
		res.render('admin/new', { id, user });
	} else {
		res.redirect('back');
	}
});

//Post new drink
router.post('/new', async (req, res) => {
	const { drinkName, size, image, description, sugarLevel, iceLevel, milkType, toppings, price } = req.body;
	const drink = new Menu({
		drinkName,
		size,
		image,
		description,
		sugarLevel,
		iceLevel,
		milkType,
		toppings,
		price
	});
	await drink.save();
	res.redirect(`/menu/${drink._id}`);
});

//Get all customer orders
router.get('/orders', async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id);
	const orders = await Order.find().populate('customerId')
	if (id && user.isAdmin) {
	res.render('admin/orders', { orders, id, user })
 } else {
	res.redirect('back');
}
})

module.exports = router;