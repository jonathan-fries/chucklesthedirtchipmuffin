/**
 * Created by jfries on 12/19/2016.
 */

var express = require('express');
var router = express.Router();
var getFortune = require('./getFortune');

router.post('/', InternalGetRandomChat);
router.get( '/', InternalGetRandomChat);

module.exports = router;

function InternalGetRandomChat( req, res, next ) {

    var id_number = getRandomIntInclusive(1, global.maxChat);

    if( global.poke )
    {
        global.poke = false;
        fortune = "Quit poking me Jeffrey!"
        var fortuneObj = formatForGoogle(fortune);
        sendGoogleResponse(fortuneObj, res);
    }
    else {

        getFortune.retrieve(id_number, function(fortune){
            var fortuneObj = formatForGoogle(fortune);
            sendGoogleResponse(fortuneObj, res)
        });

    }

}

function formatForGoogle(fortune)
{
    return  fortuneObj = {'speech' : fortune, 'displayText' : fortune, 'data' :
        {
            "google": {
                "expect_user_response": true,
                "is_ssml": false,
                "permissions_request": {}
            }
        }, 'contextOut' : [], source: 'ChucklesChat', followupEvent : {} };
}

function sendGoogleResponse(fortuneObj, res)
{
    res.setHeader('Content-Type', 'application/json');
    res.send(fortuneObj);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};