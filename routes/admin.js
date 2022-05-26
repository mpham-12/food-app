const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Menu = require('../models/menu');

router.get('/', async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id);
	if (id && user.isAdmin) {
		res.render('admin/home');
	} else {
		res.send('no access. sorry homeboy');
	}
});

router.get('/new', async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id);
	if (id && user.isAdmin) {
		res.render('admin/new', { id });
	} else {
		res.send('no access. sorry homeboy');
	}
});

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
module.exports = router;
