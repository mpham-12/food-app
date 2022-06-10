const express = require('express');
const router = express.Router();
const {catchAsync} = require('../helpers');

//Redirect to menu page
router.get('/', catchAsync(async (req, res) => {
  res.redirect('menu');
}));

module.exports = router;
