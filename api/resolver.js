/* jshint esversion: 6 */

var request = require('request');
var _ = require('underscore');

var xpath = require('xpath');
var parse5 = require('parse5');
var xmlser = require('xmlserializer');
var dom = require('xmldom').DOMParser;

function regexSearch(argument) {
  var string = "<title>Gold 80000mAh Dual USB Portable Solar Battery Charger Power Bank For Cell Phone  | eBay</title>";
  var matches = string.match(/<title>([a-zA-Z0-9\s]+)[\s]+|[\s]+eBay<\/title>$/);
  if (!matches || matches.length < 2) {
      return undefined;
  }
  console.log(matches[1]);
}
function getTitle() {

}

function readHTML(html) {
    var document = parse5.parse(html);
    var xhtml = xmlser.serializeToString(document);
    var doc = new dom().parseFromString(xhtml);
    var select = xpath.useNamespaces({ "x": "http://www.w3.org/1999/xhtml" });
    // console.log(select("head", doc));
    // console.log(select("/", doc));
    console.log(select("/html/head/title", doc));
    console.log(select("/html/head/title[1]/text()", doc));
    console.log(select("/html/head/title[1]/text()", doc));
    // console.log(nodes);
}

// The API that returns the in-email representation.
module.exports = function(req, res) {
    console.log("called");

    var html = '<div><img src="https://d1qb2nb5cznatu.cloudfront.net/users/572921-large?1440654205"><h1>Shashank Bharadwaj</h1><p>3 years developing complex full-stack javascript applications, managing small teams, and building products from the ground up.</p></div>';
            res.json({
                body: html
                    // Add raw:true if you're returning content that you want the user to be able to edit
            });

    // var url = req.query.url.trim();
    // console.log(url);

    // // Giphy image urls are in the format:
    // // http://giphy.com/gifs/<seo-text>-<alphanumeric id>
    // var matches = url.match(/([a-zA-Z0-9]+)$/);
    // if (!matches) {
    //     res.status(400).send('Invalid URL format');
    //     return;
    // }

    // request("https://www.amazon.com/Gardner-Bender-LTW-400-Electrical-Waterproof/dp/B002CC05EA/", function(error, response, body) {
    //     if (!error) {
    //         console.log("used");
    //         // console.log(body);
    //         readHTML(body);
    //         // var image = response.body.data.images.original;
    //         // var width = image.width > 600 ? 600 : image.width;
    //         var html = '<div><img src="https://d1qb2nb5cznatu.cloudfront.net/users/572921-large?1440654205"><h1>Shashank Bharadwaj</h1><p>3 years developing complex full-stack javascript applications, managing small teams, and building products from the ground up.</p></div>';
    //         res.json({
    //             body: html
    //                 // Add raw:true if you're returning content that you want the user to be able to edit
    //         });
    //     } else {
    //         res.status(500).send('Error');
    //         return;
    //     }
    // });
    // var id = matches[1];
    // console.log(id);
    // var response = request({
    //   url: url,
    //   qs: {
    //     api_key: "dc6zaTOxFJmzC"
    //   },
    //   gzip: true,
    //   json: true,
    //   timeout: 15 * 1000
    // }, function(err, response) {
    //   if (err) {
    //     res.status(500).send('Error');
    //     return;
    //   }

    //   console.log("used");
    //   console.log(body);
    //   // var image = response.body.data.images.original;
    //   // var width = image.width > 600 ? 600 : image.width;
    //   var html = '<div><img src="https://d1qb2nb5cznatu.cloudfront.net/users/572921-large?1440654205"><h1>Shashank Bharadwaj</h1><p>3 years developing complex full-stack javascript applications, managing small teams, and building products from the ground up.</p></div>';
    //   res.json({
    //     body: html
    //       // Add raw:true if you're returning content that you want the user to be able to edit
    //   });
    // });
};
