const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Menu = require('../models/menu');
const Order = require('../models/orders');
const { catchAsync } = require('../helpers');

//import from controller
const admin = require('../controllers/admin');


//Get admin page
router.get('/', catchAsync(admin.getAdmin));

//Get new form for creating drinks
router.get('/new', catchAsync(admin.getNew));

//Post new drink
router.post('/new', catchAsync(admin.postNew));

//Get all customer orders
router.get('/orders', catchAsync(admin.getAllOrders));

module.exports = router;