
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    global.poke = true;

    res.send("OK");

});

module.exports = router;