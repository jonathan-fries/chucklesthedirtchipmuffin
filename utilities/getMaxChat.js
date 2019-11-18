
const Datastore = require('@google-cloud/datastore');

// Instantiates a client
const ds = Datastore(
    //{projectId: config.get('GCLOUD_PROJECT')}
    {projectId: 'chucklesthedirtchipmuffin'}
);

ds.namespace = 'Chuckles';

module.exports = {
    retrieve : function(err, callback)
    {
        var query = ds.createQuery(['MaxNumber'])
            .limit(1);

        ds.runQuery(query, (err, entities, nextQuery) => {
            if(err) {
                console.log(err);
                return;
            }

        if (entities.length > 0) {
            global.maxChat = entities[0].MaxNumber;

            console.log('Successfully retrieved max chat number.');
            console.log(global.maxChat);
        }
        else {
            console.log('Failed to get maxChat from storage.');
            err = 'Failed to get maxChat from storage.';
            global.maxChat = 1258;
        }

        callback();

        });
    }
}
