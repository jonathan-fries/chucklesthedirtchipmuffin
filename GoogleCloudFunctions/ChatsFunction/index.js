const Datastore = require('@google-cloud/datastore');
var pathToRegexp = require('path-to-regexp');

//process.env.GOOGLE_APPLICATION_CREDENTIALS = 'ChucklesTheDirtChipMuffin-8d8ef031ee52.json'

// Instantiates a client
const ds = Datastore(
    {projectId: 'chucklesthedirtchipmuffin'}
);

ds.namespace = 'Chuckles';

exports.getChat = (req, res) => {

    var re = pathToRegexp('/:id');
    var tokens = re.exec(req.path);

    console.log(tokens[0].toString());

    var number = parseInt(tokens[0].substr(1));

    if( number === undefined || number === 0 || isNaN(number))
    {
        number = 237;
    }

    var query = ds.createQuery(['ChucklesQuotes'])
        .filter('ListNumber', '=', number)
        .limit(1);

    ds.runQuery(query, (err, entities, nextQuery) => {
        if(err) {
            console.log(err);
            return;
        }

        var fortune;

        if (entities.length > 0) {
            fortune = entities[0].QuoteText;
            console.log(fortune);
        }
        else {
            fortune = 'You broke the server, bozo!  You got toast crumbs in the default credentials and sauerkraut in the munger.';

        }

        var fortuneObj = {'fortuneText' : fortune };
        res.send(fortuneObj);

    });

}

exports.helloWorld = (req, res) => {

    var re = pathToRegexp('/:id');
    var tokens = re.exec(req.path);

    console.log(tokens[0].toString());

    var number = parseInt(tokens[0].substr(1));

    console.log('Value of number is: ' + number.toString());

    if( number === undefined || number === 0 || isNaN(number) )
    {
        console.log('Weird value received.  Setting to 237.');
        number = 237;
    }

    res.send('Hello world.  Your number was: ' + number.toString());

}