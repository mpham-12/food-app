const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const cart = require('../models/cart');

router.get('/register', (req, res) => {
	const id = req.session.user_id;
	res.render('users/register', { id });
});

router.post('/register', async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 12);
	const user = new User({
		firstName,
		lastName,
		email,
		password: hashedPassword
	});
	console.log(req.body)
	await user.save();
	// apply session to user id so that the user
	// does not need to log in seperately after registering
	req.session.user_id = user._id;
	res.redirect('/');
});

router.get('/login', (req, res) => {
	const id = req.session.user_id;
	res.render('users/login', { id });
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email: email });
	//bcrypt method to compare req.body.password to the actual hashed user password in the db
	//this returns true or false
	const validPassword = await bcrypt.compare(password, user.password);
	if (validPassword) {
		// save user id to session if successfully logged in
		req.session.user_id = user._id;
		res.redirect('/');
		console.log('logged in as:', user)
	} else {
		res.redirect('/user/login');
	}
});

router.post('/logout', (req, res) => {
	req.session.user_id = null;
	res.redirect('/');
});

// router.get('/cart', async (req, res) => {
// 	const id = req.session.user_id;
// 	const cart = await Cart.findById(id)
// res.render('users/cart', {cart})
// })

module.exports = router;