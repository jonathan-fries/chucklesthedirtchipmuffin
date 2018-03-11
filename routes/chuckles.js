/**
 * Created by jfries on 4/18/2017.
 */

/**
 * Created by jfries on 12/30/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('chuckles', {
        title: 'Chuckles Info.',
        NeedsJquery: 'false',
    });
});

module.exports = router;