/**
 * Created by jfries on 12/31/2016.
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
router.get('/:bookId/chapter/:chapterId', function(req, res, next) {

    var bookId = req.params.bookId;
    var chapterId = req.params.chapterId;
    var chapterTitle = 'Backstory';
    var notLastChapter = true;

    var query = ds.createQuery(['Chapter'])
        .filter('Book', '=', parseInt(bookId))
        .filter('Chapter', '=', parseInt(chapterId))
        .order('Chapter');

        ds.runQuery(query, (err, entities, nextQuery) => {
            if (err) {
                console.log(err);
                err.status = 404;
                res.render('offtheedge');
                return;
            }

            if(bookId == 1 && chapterId >= 9)
            {
                notLastChapter = false;
            }

            if(entities.length > 0 ) {

                chapterTitle = 'Chapter ' + chapterId + ': ' + entities[0].Title;

                res.render('book', {
                    title: chapterTitle,
                    bookId: bookId,
                    chapterId: chapterId,
                    chapterTitle: entities[0].Title,
                    chapterText: entities[0].ChapterText,
                    picture: entities[0].Picture,
                    NeedsJquery: 'false',
                    nextChapter: parseInt(chapterId) + 1,
                    NotLastChapter: notLastChapter,
                });
            }
            else
            {
                var err = new Error('Off the edge of the world!  AKA 404');
                err.status = 404;
                res.render('offtheedge');
            }

        });
});

module.exports = router;