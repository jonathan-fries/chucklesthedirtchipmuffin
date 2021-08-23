
const {Datastore} = require('@google-cloud/datastore');

//const config = require('../config');

// Instantiates a client
const ds = new Datastore(
    //{projectId: config.get('GCLOUD_PROJECT')}
    {projectId: 'chucklesthedirtchipmuffin'}
);

ds.namespace = 'Chuckles';

module.exports = {
retrieve : function(number, callback)
{
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

            callback(fortune);

        });
    }
}