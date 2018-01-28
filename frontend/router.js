const express = require('express');
const router = express.Router();

const config = require('../config/config');

router.get('/', async (req, res) => {
  const context = Object.assign({}, config);
  res.render('index.html', context);
});

module.exports = router;
