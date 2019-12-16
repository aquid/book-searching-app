const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile('index.html');
});

module.exports = router;
