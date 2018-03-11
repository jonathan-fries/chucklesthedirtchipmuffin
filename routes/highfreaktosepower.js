/**
 * Created by jmoneyesq on 2/1/2017.
 */
/**
 * Created by jfries on 12/30/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('highfreaktosepower', {
        layout: 'gameMain',
        title: 'High Freaktose Power!',
        NeedsJquery: 'false',
    });
});

module.exports = router;