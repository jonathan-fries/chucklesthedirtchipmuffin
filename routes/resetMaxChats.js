var express = require('express');
var router = express.Router();
var getMaxChat = require('../utilities/getMaxChat');

/* GET users listing. */
router.get('/', function(req, res, next) {

    var err;
    getMaxChat.retrieve( err, function() {

        if(err)
        {
            console.log('Error received setting maxChat:' + err);
            res.send("woopsie");
        }
        else{
            console.log('Confirmed retrieval of maxChat from storage.  Value = ' + global.maxChat );
            res.send("OK.  Value is: " + global.maxChat);
        }

    });

});

module.exports = router;

