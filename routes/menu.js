const express = require('express');
const router = express.Router();
const Menu = require('../models/menu')

router.get('/', async (req, res) => {
  const menuItems = await Menu.find();
  res.render('menu', { menuItems });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const drink = await Menu.findById(id)
  res.render('menu/show', { drink });
});


module.exports = router;