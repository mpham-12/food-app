const express = require('express');
const router = express.Router();
const Menu = require('../models/menu')
const Cart = require('../models/cart')
const User = require('../models/users')

router.get('/', async (req, res) => {
  const id = req.session.user_id;
  const user = await User.findById(id);
  const menuItems = await Menu.find();
  res.render('menu', { menuItems, id, user });
});

router.get('/:drinkId', async (req, res) => {
  const id = req.session.user_id;
  const user = await User.findById(id);
  const { drinkId } = req.params;
  const drink = await Menu.findById(drinkId)
  res.render('menu/show', { drink, id, user });
});

router.post('/:drinkId', async (req, res) => {
  const id = req.session.user_id;
  const { drinkId } = req.params;
  const drink = await Menu.findById(drinkId)
  let cart = await Cart.findOne({ customerId: id })
  if (cart) {
    cart.cartItems.push({
      drinkName: drink.drinkName,
      quantity: req.body.quantity,
      size: req.body.size,
      sugarLevel: req.body.sugarLevel,
      iceLevel: req.body.iceLevel,
      milkType: req.body.milkType,
      topping: req.body.topping,
      // price: drink.price,
      image: drink.image
    })
    await cart.save()
    res.redirect('/menu')
  } else {
    const newCart = await Cart.create({
      customerId: id,
      cartItems: [
        {
          drinkName: drink.drinkName,
          quantity: req.body.quantity,
          size: req.body.size,
          sugarLevel: req.body.sugarLevel,
          iceLevel: req.body.iceLevel,
          milkType: req.body.milkType,
          topping: req.body.topping,
          // price: drink.price
          image: drink.image
        }
      ]
    })
    res.redirect('/menu')

  }
});

module.exports = router;