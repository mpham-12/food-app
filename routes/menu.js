const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');
const Cart = require('../models/cart');
const User = require('../models/users');
const Topping = require('../models/topping');
const Milk = require('../models/milk');
const Size = require('../models/size');

router.get('/', async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id);
	const menuItems = await Menu.find();
	res.render('menu', { menuItems, id, user });
});

router.post('/:drinkId/delete', async (req, res) => {
	const { drinkId } = req.params;
	await Menu.findByIdAndDelete(drinkId);
	res.redirect('/menu')
});

router.get('/:drinkId', async (req, res) => {
	const id = req.session.user_id;
	const toppings = await Topping.find();
	const milks = await Milk.find();
	const sizes = await Size.find();
	const user = await User.findById(id);
	const { drinkId } = req.params;
	const drink = await Menu.findById(drinkId);
	console.log('drink', drink)
	res.render('menu/show', { drink, id, user, toppings, milks, sizes });
});

router.post('/:drinkId', async (req, res) => {
	const id = req.session.user_id;
	const { drinkId } = req.params;
	const milk = await Milk.find({milkName: req.body.milkType});
	const size = await Size.find({size: req.body.size});
	const topping = await Topping.find({toppingName: req.body.topping});
	console.log(milk)
	const drink = await Menu.findById(drinkId);
	let cart = await Cart.findOne({ customerId: id });
	if (cart) {
		cart.cartItems.push({
			drinkName: drink.drinkName,
			quantity: req.body.quantity,
			size: size,
			sugarLevel: req.body.sugarLevel,
			iceLevel: req.body.iceLevel,
			milkType: milk,
			topping: topping,
			image: drink.image
		});
		await cart.save();
		// console.log('existing cart', cart)
		// console.log('req body 1', req.body)
		console.log('milk', milk)
		console.log('size', size)
		console.log('topping', topping)
		res.redirect('/menu');
	} else {
		const newCart = await Cart.create({
			customerId: id,
			cartItems: [
				{
					drinkName: drink.drinkName,
					quantity: req.body.quantity,
					size: size,
					sugarLevel: req.body.sugarLevel,
					iceLevel: req.body.iceLevel,
					milkType: milk,
					topping: topping,
					image: drink.image
				}
			]
		});
		console.log('new cart', cart)
		console.log('req body 2', req.body)
		res.redirect('/menu');
	}
});

router.get('/:drinkId/edit', async (req, res) => {
	const id = req.session.user_id;
	const { drinkId } = req.params;
	const user = await User.findById(id);
	const drink = await Menu.findById(drinkId);
	if (id && user.isAdmin) {
		console.log('DRINK--------', drink);
		res.render('admin/edit', { drink });
	} else {
		res.send('you cannot perform this action');
	}
});

router.post('/:drinkId/edit', async (req, res) => {
	const id = req.session.user_id;
	const { drinkId } = req.params;
	const user = await User.findById(id);
	const drink = await Menu.findById(drinkId);
	if (id && user.isAdmin) {
		await Menu.findByIdAndUpdate(drinkId, { ...req.body });
		await drink.save();
		res.redirect(`/menu/${drink._id}`);
	} else {
		res.send('you cannot perform this action');
	}
});



module.exports = router;
