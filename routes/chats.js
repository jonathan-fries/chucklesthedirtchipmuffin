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

ds.namespace = 'Chuckles';

/* GET users listing. */
router.get('/:id', function(req, res, next) {

    var id_number = parseInt(req.params.id);

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

    var fortuneObj = {'fortuneText' : fortune };

    res.send(fortuneObj);

    });

});

module.exports = router;