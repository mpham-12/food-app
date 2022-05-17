const express = require('express');
const router = express.Router();
const Menu = require('../models/menu')
const Cart = require('../models/cart')

router.get('/', async (req, res) => {
  const id = req.session.user_id;
  const menuItems = await Menu.find();
  res.render('menu', { menuItems, id });
});

router.get('/:drinkId', async (req, res) => {
  const id = req.session.user_id;
  const { drinkId } = req.params;
  const drink = await Menu.findById(drinkId)
  res.render('menu/show', { drink, id });
});

router.post('/:drinkId', async (req, res) => {
const id = req.session.user_id;
let cart = await Cart.findOne({id})
const { drinkId } = req.params;
const drink = await Menu.findById(drinkId)
console.log('id', id)
cart.cartItems.push({
  drinkName: drink.drinkName,
  quantity: req.body.quantity,
  size: req.body.size,
  sugarLevel: req.body.sugarLevel,
  iceLevel: req.body.iceLevel,
  milkType: req.body.milkType,
  topping: req.body.topping,
  price: drink.price,
  image: drink.image
})
console.log('cart.cartItems', cart.cartItems)
await cart.save()
  res.send('added to cart')
});

module.exports = router;