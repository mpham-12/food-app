const express = require('express');
const router = express.Router();

//Redirect to menu page
router.get('/', async (req, res) => {
  res.redirect('menu');
});

module.exports = router;
