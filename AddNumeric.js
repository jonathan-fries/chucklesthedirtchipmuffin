
/**
 * Created by jfries on 12/19/2016.
 */

const Datastore = require('@google-cloud/datastore');

//const config = require('../config');
const kind = 'ChucklesQuotes';

// Instantiates a client
const ds = Datastore(
    //{projectId: config.get('GCLOUD_PROJECT')}
    {projectId: 'chucklesthedirtchipmuffin'}
);

ds.namespace = 'Chuckles';

var query = ds.createQuery(['ChucklesQuotes'])
    .order('Random')
    .filter('Active', '=', true);

ds.runQuery(query, (err, entities, nextQuery) => {
    if(err) {
        console.log(err);
        return;
    }

    //var fortune;
    //var random;

    if(entities.length > 0 )
    {

        for( var i = 0; i < entities.length; i++)
        {
            console.log(entities[0].QuoteText);
            console.log(i + 1);

            var entity = entities[i];

            entity.ListNumber = i + 1;

            update(entity.id, entity, function(err, data){
                console.log(data);
                if(err)
                {
                    console.log(err.message);
                }
                else
                {
                    console.log("Update success.")
                }

            });

        }

    }

})

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