const User = require('../models/users');
const Menu = require('../models/menu');
const Order = require('../models/orders');

//Get admin page
const getAdmin = async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id);
	if (id && user.isAdmin) {
		res.render('admin/home', { id, user });
	} else {
		res.redirect('back')
	}
}

//Get new form for creating drinks
const getNew = async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id);
	if (id && user.isAdmin) {
		res.render('admin/new', { id, user });
	} else {
		res.redirect('back');
	}
}

//Post new drink
const postNew = async (req, res) => {
	const { drinkName, image, description, sugarLevel, iceLevel, price } = req.body;
	const drink = new Menu({
		drinkName,
		image,
		description,
		sugarLevel,
		iceLevel,
		price
	});
	await drink.save();
	res.redirect(`/menu/${drink._id}`);
}

//Get all customer orders
const getAllOrders = async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id);
	const orders = await Order.find().populate('customerId')
	if (id && user.isAdmin) {
		res.render('admin/orders', { orders, id, user })
	} else {
		res.redirect('back');
	}
}

// export to admin router
module.exports = {
  getAdmin,
  getNew,
  postNew,
  getAllOrders
}