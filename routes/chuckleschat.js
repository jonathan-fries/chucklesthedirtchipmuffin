/**
 * Created by jfries on 12/30/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id*?', function(req, res, next) {
    res.render('chuckleschat', {
        title: 'Chuckles Chat',
        NeedsJquery: 'true',
        maxChat: global.maxChat,
    });
});

module.exports = router;