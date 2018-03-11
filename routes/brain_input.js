/**
 * Created by jfries on 1/14/2017.
 */


var express = require('express');
var router = express.Router();
const Datastore = require('@google-cloud/datastore');
const kind = 'ChucklesQuotes';


var bodyParser = require('body-parser');

router.use(bodyParser.json());

//const config = require('../config');

// Instantiates a client
const ds = Datastore(
    //{projectId: config.get('GCLOUD_PROJECT')}
    {projectId: 'chucklesthedirtchipmuffin'}
);

ds.namespace = 'Chuckles';

/* GET users listing. */
router.post('/', function(req, res, next) {

    var rand_num = Math.random();

    var obj = {
        Active: false,
        QuoteText: req.body.quote,
        Random: rand_num
    };

    if(obj.QuoteText == null)
    {
        obj.QuoteText = "Unfortunate placeholder."
    }

    create(obj, function(err, data){
        console.log(data);
        if(err)
        { //res.sendStatus(500).json('Me brain es shmebby very bad feel wah.');
            res.send("{ message : 'Many sads, no happies. :('"); }
        else
        {
            //res.sendStatus(200).json('I like my brain!');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ message: 'Many happies, no sads!' }));
            //res.send("{ message : 'Many happies, no sads!'");
        }

    });

});


function update (id, data, cb) {
    var key;
    if (id) {
        key = ds.key([kind, parseInt(id, 10)]);
    } else {
        key = ds.key(kind);
    }

    const entity = {
        key: key,
        data: toDatastore(data, ['description'])
    };

    ds.save(
        entity,
        (err) => {
            data.id = entity.key.id;
            cb(err, err ? null : data);
        }
    );
}
// [END update]

function create (data, cb) {
    update(null, data, cb);
}

function toDatastore (obj, nonIndexed) {
    nonIndexed = nonIndexed || [];
    const results = [];
    Object.keys(obj).forEach((k) => {
        if (obj[k] === undefined) {
            return;
        }
        results.push({
            name: k,
            value: obj[k],
            excludeFromIndexes: nonIndexed.indexOf(k) !== -1
        });
    });
    return results;
}

module.exports = router;