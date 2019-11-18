var express = require('express');
var router = express.Router();
var randomCounter = 0;
var randomReset = true;
var randomNumbers = [];
const request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {

    var max = global.maxChat;
    var license = require('./random_license.js');
    console.log(license.random_org_license);
    var localCounter = randomCounter;
    --randomCounter;

    var randomObj = {};

    if(randomReset)
    {
      randomReset = false;
      var jsonRequest = {
        "jsonrpc" : "2.0",
        "method":"generateIntegers",
        "params": {
          "apiKey":license.random_org_license,
          "n":25,
          "min":1,
          "max":max,
          "replacement":true,
          "base":10
          },
        "id":5251
        }
        var options = {
          uri : 'https://api.random.org/json-rpc/2/invoke',
          method: 'POST',
          json: jsonRequest,
          headers: {"content-type": "application/json"}
        }
      request(options, (err, res, body) => {
        if (err) {
          randomReset = true;
          return console.log(err);
        }
        console.log(body);
        randomNumbers = body.result.random.data;
        randomCounter = 24;
      });
    }


    if(localCounter == 5)
    {
      console.log("We are using real random, but we are close to running out.");
      randomReset == true;
      randomObj.randomNumber = randomNumbers[localCounter];
    }
    else if (localCounter == 0) {
      console.log("We are using pseudorandom number while we wait for our real random.");
      randomObj.randomNumber = getRandomIntInclusive(1, max);
    }
    else {
      console.log("We are using a real random and everythign is cool.")
      randomObj.randomNumber = randomNumbers[localCounter];
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(randomObj);

});

module.exports = router;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
