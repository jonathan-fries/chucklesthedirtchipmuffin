/**
 * Created by jfries on 1/10/2017.
 */

const Datastore = require('@google-cloud/datastore');
var fs = require('fs');
var array;
const kind = 'ChucklesQuotes';


// Instantiates a client
const ds = Datastore(
    //{projectId: config.get('GCLOUD_PROJECT')}
    {projectId: 'chucklesthedirtchipmuffin'}
);

ds.namespace = 'Chuckles';

fs.readFile('ChucklesChat.json', 'utf8', function (err, data) {
    if (err) throw err;
    array = JSON.parse(data);

    array.forEach(function (obj) {
        console.log(obj);
        create(obj, function(err, data){
            console.log(data);
        });
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