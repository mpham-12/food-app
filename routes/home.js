const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const id = req.session.user_id;
  res.render('home', {id});
});


module.exports = router;
