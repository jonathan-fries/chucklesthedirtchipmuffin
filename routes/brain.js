/**
 * Created by jfries on 1/14/2017.
 */
/**
 * Created by jfries on 12/30/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('brain', {
        title: 'Chuckles Brain',
        NeedsJquery: 'true',
    });
});

module.exports = router;