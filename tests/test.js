var getMaxChat = require('../utilities/getMaxChat');
var getFortune = require('../routes/getFortune');
var assert = require('assert');
var request = require('supertest');

//var require1 = require('really-need');

describe('getMaxChat', function() {
    describe('Test value', function() {
        it('Should return a value greter than 840', function(done){
            var err;
            getMaxChat.retrieve(err, function(){
                if(err) done(err);
                else if (global.maxChat < 840) done('Failed to get value');
                else done();
            });
        });
    });
});

describe('getFortune', function() {
    describe('Test value', function() {
        it('Should return specific message.', function(done){
            getFortune.retrieve( 735, function(fortune){
                if (fortune != "The opposite of french fries is emotional platypus.") done('Failed to get value');
                else done();
            });
        });
    });
});

describe('simple alt http test', function(){
    it( '/ responds with OK', function(done){
        var server;
        server = require('../app');
        request(server).get('/')
            .expect(200)
            .expect(function(res) {
                if(!(res.text.indexOf('jellyfish') > -1))
                {
                    throw new Error("jellyfish");
                    console.log(res.text);
                }
            })
            .end(done);
    });
    it( '/poke responds with OK', function(done){
        var server;
        server = require('../app');
        request(server).get('/poke')
            .expect(200)
            .expect('OK', done);

    });
    it( '/GetRandomChat responds with OK', function(done){
        var server;
        server = require('../app');
        request(server).get('/poke')
            .expect(200, done);

    });
    it( '/resetmaxchats responds with OK', function(done){
        var server;
        server = require('../app');
        request(server).get('/resetmaxchats')
            .expect(200, done);

    });
    it( '/thechob responds with OK', function(done){
        var server;
        server = require('../app');
        request(server).get('/thechob')
            .expect(200)
            .expect(function(res) {
                if(!(res.text.indexOf('gob') > -1))
                {
                    throw new Error("gob");
                    console.log(res.text);
                }
            })
            .end(done);


    });
    it( '/chuckles responds with OK', function(done){
        var server;
        server = require('../app');
        request(server).get('/chuckles')
            .expect(200, done);

    });
    it( '/chuckleschat responds with OK', function(done){
        var server;
        server = require('../app');
        request(server).get('/chuckleschat')
            .expect(200, done)
            .expect(function(res) {
                if(!(res.text.indexOf('hug') > -1))
                {
                    throw new Error("Page text invalid.");
                    console.log(res.text);
                }
            })
            .end(done);

    });
    it( '/highfreaktosepower responds with OK', function(done){
        var server;
        server = require('../app');
        request(server).get('/highfreaktosepower')
            .expect(200, done);
    });
    it( '/book/1/chapter/1 responds with OK', function(done){
        var server;
        server = require('../app');
        request(server).get('/book/1/chapter/1')
            .expect(200)
            .expect(function(res) {
                if(!(res.text.indexOf('Once upon a time') > -1))
                {
                    throw new Error("Page text invalid.");
                    console.log(res.text);
                }
        })
            .end(done);

    });


    it( 'Check 404', function(done){
        var server;
        server = require('../app');
        request(server).get('/pig')
            .expect(404, done);

    });
    it( 'Check chat after poke', function(done){
        var server;
        server = require('../app');
        request(server).get('/chats/735')
            .expect(200, {"fortuneText":"Stop poking me Jeffrey!  I mean it!"}, done);

    });
    it( 'Check chat message', function(done){
        var server;
        server = require('../app');
        request(server).get('/chats/735')
            .expect(200, {"fortuneText":"The opposite of french fries is emotional platypus."}, done);
    });

});
