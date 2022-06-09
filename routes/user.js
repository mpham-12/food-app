const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const Cart = require('../models/cart');
const Menu = require('../models/menu');
const Topping = require('../models/topping');
const Milk = require('../models/milk');
const Size = require('../models/size');
const Order = require('../models/orders');

//Get user profile information
router.get('/', async (req, res) => {
	const id = req.session.user_id;
	const admin = await User.find({ admin: true });
	const user = await User.findById(id);
	if (!user) {
		res.redirect('/user/login')
	} else
		res.render('users/account', { user, id, admin });
});

//Edit user information
router.put('/', async (req, res) => {
	const id = req.session.user_id;
	const newFirstName = req.body.firstName
	const newLastName = req.body.lastName
	const newNumber = req.body.phoneNumber

	if (!newLastName && !newNumber && newFirstName.length >= 1) {
		await User.findByIdAndUpdate(id, { $set: { firstName: newFirstName } });
	}
	if (!newFirstName && !newNumber && newLastName.length >= 1) {
		await User.findByIdAndUpdate(id, { $set: { lastName: newLastName } });
	}
	if (!newFirstName && !newLastName && newNumber.length >= 1) {
		await User.findByIdAndUpdate(id, { $set: { phoneNumber: newNumber } });
	}
	res.status(201).send();
});

//Get register page
router.get('/register', (req, res) => {
	const id = req.session.user_id;
	res.render('users/register', { id });
});

//Post user register information to database
router.post('/register', async (req, res) => {
	const { firstName, lastName, email, phoneNumber, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 12);
	const user = new User({
		firstName,
		lastName,
		email,
		phoneNumber,
		password: hashedPassword
	});
	console.log(req.body);
	await user.save();
	// apply session to user id so that the user
	// does not need to log in seperately after registering
	req.session.user_id = user._id;
	res.redirect('/');
});

//Get login page
router.get('/login', (req, res) => {
	const id = req.session.user_id;
	res.render('users/login', { id });
});

//Post login information
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email: email });
	//bcrypt method to compare req.body.password to the actual hashed user password in the db
	//this returns true or false
	const validPassword = await bcrypt.compare(password, user.password);
	if (validPassword) {
		//Save user id to session if successfully logged in
		req.session.user_id = user._id;
		const userId = req.session.user_id
		const cart = await Cart.find({ customerId: userId });
		res.redirect('/');
		console.log('logged in as:', user);
		console.log('USER CART', cart);
	} else {
		res.redirect('/user/login');
	}
});

//Get cart for user
router.get('/cart', async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id)
	const cart = await Cart.find({ customerId: id }).populate('cartItems.topping')
	if (id && cart.length === 0) {
		res.render('users/cart', { cart, id, user });
	}
	if (id && cart) {
		const cartItems = cart[0].cartItems;
		res.render('users/cart', { cart, cartItems, id, user });
	}
	if (!id) {
		res.render('users/cart', { cart, id, user });
	}

});

//Get checkout page
router.get('/checkout', async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id)
	const cart = await Cart.find({ customerId: id }).populate('cartItems.topping');
	const cartItems = cart[0].cartItems;
	res.render('users/checkout', { user, cartItems, id, cart })
})

//Post to checkout 
router.post('/checkout', async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id);
	const cart = await Cart.find({ customerId: id }).populate('cartItems.topping')
	const cartItems = cart[0].cartItems;

	//Calculating drink total based on selections to post to orders
	let subTotal = 0;
	cartItems.forEach(function (item) {
		let toppingsPrice = [];
		for (topping of item.topping) {
			toppingsPrice.push(topping.price)
		}
		const allToppings = toppingsPrice.reduce((previousValue, currentValue) => previousValue + currentValue)
		let drinkTotal = (4.99 + item.milkType[0].price + item.size[0].price + allToppings) * item.quantity
		drinkTotal.toFixed(2)
		subTotal += Number(drinkTotal)
	})
	let total = (subTotal * 1.13).toFixed(2)

	let checkoutArr = [];

	for (item of cartItems) {
		checkoutArr.push(item)
	}

	//Generate random order number
	let orderId = Math.random().toString(36).slice(2)

	//Create order
	await Order.create({
		customerId: id,
		orderId: orderId,
		orderItems: checkoutArr,
		total: total
	})

	//Empty cart once items are posted to orders
	await Cart.findOneAndDelete({ customerId: id })
	res.render('users/orderComplete', { user, id, orderId })
})

//Get previous orders for a user
router.get('/orders', async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id);
	const pastOrders = await Order.find({ customerId: id })
	res.render('users/orderHistory', { pastOrders, id, user })
})

//delete drink from cart
router.post('/cart/:drinkId/edit', async (req, res) => {
	res.redirect('/menu');
});

//logout of user account
router.post('/logout', (req, res) => {
	req.session.user_id = null;
	res.redirect('/');
});

module.exports = router;
