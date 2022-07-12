const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const Cart = require('../models/cart');
const Order = require('../models/orders');
const { catchAsync } = require('../helpers');
//import from user controller
const userInfo = require('../controllers/user');

//Get user profile information
router.get('/', catchAsync(userInfo.getProfile));

//Edit user information
router.put('/', catchAsync(userInfo.editProfile));

//Get register page
router.get('/register', userInfo.getRegister);

//Post user register information to database
router.post('/register', catchAsync(userInfo.postRegister));

//Get login page
router.get('/login', userInfo.getLogin);

//Post login information
router.post('/login', catchAsync(userInfo.postLogin));

//Get cart for user
router.get('/cart', (userInfo.getUserCart));

//Get checkout page
router.get('/checkout', catchAsync(userInfo.getCheckout));

//Post to checkout 
router.post('/checkout', catchAsync(userInfo.postToCheckout));

//Get previous orders for a user
router.get('/orders', catchAsync(userInfo.getPreviousDrinks));

//Delete drink from cart
router.post('/cart', catchAsync(userInfo.deleteDrink));

//Logout of user account
router.post('/logout', userInfo.postLogout);


module.exports = router;
