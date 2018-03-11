/**
 * Created by jfries on 12/30/2016.
 */
/**
 * Created by jfries on 12/30/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('thechob', {
        title: 'The Chob',
        NeedsJquery: 'false',
    });
});

module.exports = router;