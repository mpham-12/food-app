const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Menu = require('../models/menu');
const Order = require('../models/orders');

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

router.get('/orders', async (req, res) => {
	const orders = await Order.find().populate('customerId')
	let toppingsArr = [];
	// console.log('ORDERS', orders[0])
	// console.log('TOPPINGS', toppings)
	// console.log('ORDERITEMS', orders[0].orderItems[0].milkType[0].milkName)	
	console.log()


	// for (order of orders) {
	// 	// console.log('ORDER', order)
	// 	for (orderItem of order.orderItems) {
	// 		console.log('ORDERITEM', orderItem)
	// 		for (topping of orderItem.topping) {
	// 			// console.log('topping', orderItem.topping)
	// 		}
	// 	}
	// }
	// console.log('toppingsArr', toppingsArr)
	res.render('admin/orders', { orders, toppingsArr })
})

module.exports = router;

// <% let toppingsArr=[] %>
//                   <% for (topping of item.topping){ %>
//                     <% toppingsArr.push(topping.toppingName) %>
//                       <% }%>
