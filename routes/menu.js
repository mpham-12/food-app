const express = require('express');
const router = express.Router();
const {catchAsync} = require('../helpers');

//import from menu controller
const drinkMenu = require('../controllers/menu');

//Get menu page
router.get('/', catchAsync(drinkMenu.getMenu));

//Delete drink from database
router.delete('/:drinkId', catchAsync(drinkMenu.deleteDrinkFromDb));

//Get individual drink page
router.get('/:drinkId', catchAsync(drinkMenu.getDrink));

//Add drink to cart
router.post('/:drinkId', catchAsync(drinkMenu.addToCart));

//Get edit page for admin
router.get('/admin/:drinkId/edit', catchAsync(drinkMenu.adminEdit));

//Post edited drink details to database
router.post('/admin/:drinkId/edit', catchAsync(drinkMenu.editDrink));

module.exports = router;
