/**
 * Created by jfries on 12/19/2016.
 */

var express = require('express');
var router = express.Router();
const Datastore = require('@google-cloud/datastore');

//const config = require('../config');

// Instantiates a client
const ds = Datastore(
    //{projectId: config.get('GCLOUD_PROJECT')}
    {projectId: 'chucklesthedirtchipmuffin'}
);

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

ds.namespace = 'Chuckles';

/* GET users listing. */
//router.get('/', PostOrGet(req, res, next));
router.post('/', function(req, res, next) {

    var id_number = getRandomIntInclusive(1, 770);

    var query = ds.createQuery(['ChucklesQuotes'])
        .filter('ListNumber', '=', id_number)
        .limit(1);

    ds.runQuery(query, (err, entities, nextQuery) => {
        if (err) {
            console.log(err);
            return;
        }

        var fortune;

    if(entities.length > 0 )
    {
        fortune = entities[0].QuoteText;

        console.log(fortune);

    }
    else
    {
        fortune = 'You broke the server, bozo!  You got toast crumbs in the default credentials and sauerkraut in the munger.';

    }

    var fortuneObj = {'speech' : fortune, 'displayText' : fortune, 'data' :
        {
            "google": {
            "expect_user_response": false,
            "is_ssml": false,
            "permissions_request": {}
        }
    }, 'contextOut' : [], source: 'ChucklesChat' };

    //var fortuneObj = { "messages": [
    //    {
    //        "speech": fortune ,
    //        "type": 0
    //    }
    //]};

    res.setHeader('Content-Type', 'application/json');
    res.send(fortuneObj);

    });

});

module.exports = router;