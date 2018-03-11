/**
 * Created by jfries on 10/7/2016.
 */

var SitemapGenerator = require('sitemap-generator');

// create generator
var generator = new SitemapGenerator('http://chucklesthedirtchipmuffin.com', {
    port: 80,
    restrictToBasepath: false,
    stripQuerystring: false
});

// register event listeners
generator.on('done', function (sitemap) {
    console.log(sitemap); // => prints xml sitemap
    var fs = require('fs');
    fs.writeFile("sitemap.xml", sitemap, function (err) {
        if (err) {
            return console.log(err);
        }
    });
});

// start the crawler
generator.start();