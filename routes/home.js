const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', async (req, res) => {
  res.redirect('menu');
});

module.exports = router;
