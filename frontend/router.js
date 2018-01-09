const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const context = {};
  res.render('index.html', context);
});

module.exports = router;
