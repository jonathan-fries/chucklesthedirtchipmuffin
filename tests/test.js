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
    it( 'Respond with OK', function(done){
        var server;
        server = require('../app');
        request(server).get('/').expect(200, done);
    });
    it( 'Respond with OK', function(done){
        var server;
        server = require('../app');
        request(server).get('/poke')
            .expect(200)
            .expect('OK', done);

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

// describe('loading express', function () {
//     var server;
//     beforeEach(function () {
//         server = require1('../bin/www', { bustCache: true });
//     });
//     afterEach(function (done) {
//         server.close(done);
//     });
//     it('responds to /', function testSlash(done) {
//         //request.Test(server, '/').expect(200, done);
//         superRequest(server)
//             .get('/')
//             .expect(200, done);
//     });
//     it('404 everything else', function testPath(done) {
//         console.log('test 404');
//         superRequest(server)
//             .get('/foo/bar')
//             .expect(404, done);
//     });
// });
