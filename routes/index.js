var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chuckles the Dirt-Chip Muffin!' });
});

module.exports = router;
