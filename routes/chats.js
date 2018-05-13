/**
 * Created by jfries on 12/19/2016.
 */

var express = require('express');
var router = express.Router();
var getFortune = require('./getFortune');

/* GET users listing. */
router.get('/:id', function(req, res, next) {

    var id_number = parseInt(req.params.id);

    if(global.poke)
    {
        global.poke = false;
        var fortuneObj = {'fortuneText' : 'Stop poking me Jeffrey!  I mean it!' };
        res.send(fortuneObj);
    }
    else
    {
        getFortune.retrieve(id_number, function(fortune){
            var fortuneObj = {'fortuneText' : fortune };
            res.send(fortuneObj);
        });
    }

});

module.exports = router;