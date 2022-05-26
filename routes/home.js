const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', async (req, res) => {
  const id = req.session.user_id;
  const user = await User.findById(id);
  res.render('home', {id, user});
});

module.exports = router;
