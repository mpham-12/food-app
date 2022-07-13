const Menu = require('../models/menu');
const Cart = require('../models/cart');
const User = require('../models/users');
const Topping = require('../models/topping');
const Milk = require('../models/milk');
const Size = require('../models/size');

//Get menu page
const getMenu = async (req, res) => {
	const id = req.session.user_id;
	const user = await User.findById(id);
	const menuItems = await Menu.find();
	res.render('menu', { menuItems, id, user });
}

//Delete drink from database (Admin user)
const deleteDrinkFromDb = async (req, res) => {
	const { drinkId } = req.params;
	await Menu.findByIdAndDelete(drinkId);
	res.redirect('/menu')
}

//Get individual drink page
const getDrink = async (req, res) => {
	const id = req.session.user_id;
	const toppings = await Topping.find();
	const milks = await Milk.find();
	const sizes = await Size.find();
	const user = await User.findById(id);
	const { drinkId } = req.params;
	const drink = await Menu.findById(drinkId);
	res.render('menu/show', { drink, id, user, toppings, milks, sizes });
}

//Add drink to cart
const addToCart = async (req, res) => {
	const id = req.session.user_id;
	const { drinkId } = req.params;
	const milk = await Milk.find({ milkName: req.body.milkType });
	const size = await Size.find({ size: req.body.size });
	const topping = await Topping.find({ toppingName: req.body.topping });
	const drink = await Menu.findById(drinkId);
	let cart = await Cart.findOne({ customerId: id });

	//If user has an existing cart, push new drink into cart
	if (cart) {
		cart.cartItems.push({
			drinkName: drink.drinkName,
			drinkId: drinkId,
			quantity: req.body.quantity,
			size: size,
			sugarLevel: req.body.sugarLevel,
			iceLevel: req.body.iceLevel,
			milkType: milk,
			topping: topping,
			image: drink.image
		});
		await cart.save();
		res.redirect('/menu');

		//If user does not have an existing cart, create one and add drink
	} else {
		await Cart.create({
			customerId: id,
			cartItems: [
				{
					drinkName: drink.drinkName,
					drinkId: drinkId,
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
		res.redirect('/menu');
	}
}

//Get edit page for admin
const adminEdit = async (req, res) => {
	const id = req.session.user_id;
	const { drinkId } = req.params;
	const user = await User.findById(id);
	const drink = await Menu.findById(drinkId);
	if (id && user.isAdmin) {
		res.render('admin/edit', { drink, id, user });
	} else {
		res.redirect('back');
	}
}

//Post edited drink details to database
const editDrink = async (req, res) => {
	const id = req.session.user_id;
	const { drinkId } = req.params;
	const user = await User.findById(id);
	const drink = await Menu.findById(drinkId);
	if (id && user.isAdmin) {
		await Menu.findByIdAndUpdate(drinkId, { ...req.body });
		await drink.save();
		res.redirect(`/menu/${drink._id}`);
	}
}

// export to admin router
module.exports = {
	getMenu,
	deleteDrinkFromDb,
	addToCart,
	adminEdit,
	getDrink,
	editDrink
}

