/**
 * Created by jfries on 12/30/2016.
 */
var express = require('express');
var router = express.Router();

const {Datastore} = require('@google-cloud/datastore');

// Instantiates a client
const ds = new Datastore(
    {projectId: 'chucklesthedirtchipmuffin'}
);

ds.namespace = 'Chuckles';


/* GET home page. */
router.get('/:id*?', function(req, res, next) {

    var chatId = req.params.id;

    if(!chatId)
    {
      chatId  = getRandomIntInclusive(1, global.maxChat);
    }

    randomNumber = getRandomIntInclusive(1, 32);

    console.log("Chat ID = " + chatId);
    console.log("Image Number = " + randomNumber);

    var query = ds.createQuery(['ChucklesQuotes'])
        .filter('ListNumber', '=', parseInt(chatId))
        .order('ListNumber');

        ds.runQuery(query, (err, entities, nextQuery) => {
            if (err) {
                console.log(err);
                err.status = 404;
                res.render('error');
                return;
            }

            if(entities.length > 0 ) {

              console.log("We got something back.  Sweet!");
              console.log("Quote = " + entities[0].QuoteText);


              res.render('chuckleschat', {
                  title: 'Chuckles Chat',
                  quoteText: entities[0].QuoteText,
                  picture: 'https://storage.googleapis.com/chucklesthedirtchipmuffin.com/ChatPix/ChucklesChat' + randomNumber + '.png',
                  NeedsJquery: 'true',
                  maxChat: global.maxChat,
              });
            }
            else
            {
                console.log("Nothing returned from data store.");
                res.render('error');
            }
    });
});

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = router;
