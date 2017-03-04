/* jshint esversion: 6 */

const request = require("request");

function regexSearch(content: string, regex: RegExp) {
  const matches = content.match(regex);
  if (!matches || matches.length < 2) {
      return undefined;
  }
  return matches[1];
}
function getTitle(body: string) {
    const regex = /<title>([a-zA-Z0-9\s]+)[\s]+|[\s]+eBay<\/title>$/;
    // const body = "<title>Gold 80000mAh Dual USB Portable Solar Battery Charger Power Bank For Cell Phone  | eBay</title>";
    return regexSearch(body, regex);
}
function getRatings(body: string) {
    const regex = /ebay-review-start-rating\">[\s]*([\d\.]+)[\s]*<\/span>/;
    // body = "<span class=\"ebay-review-start-rating\">\n4.6</span>\n<div class=\"ebay-star-rating\">";
    return regexSearch(body, regex);
}
function getImageURL(body: string) {
    const regex = /og:image"[\s]*[cC]ontent="([^"]+)"/;
    // body = "<meta property=\"og:image\" content=\"http://i.ebayimg.com/images/i/131644763083-0-1/s-l1000.jpg\">";
    return regexSearch(body, regex);
}
function getReviews(body: string) {
    const regex = /ebay-reviews-count">[^\d]*(\d*[^<]+)<\/span>/;
    // body = "<span class=\"ebay-reviews-count\">average based on 15 product ratings</span>";
    return regexSearch(body, regex);
}
function getPrice(body: string) {
    const regex = /id=\"prcIsum"[^>]*>([^<]+)<\/span>/;
    // body = "<span class=\"notranslate\" id=\"prcIsum\" itemprop=\"price\" style=\"\" content=\"9.89\">US $9.89</span>";
    return regexSearch(body, regex);
}
// <meta property="og:image" content="http://i.ebayimg.com/images/i/131644763083-0-1/s-l1000.jpg">
// console.log(getRatings(""));

// class fetcher extends AnotherClass {

//     constructor(argument) {
//         // code...
//     }
// }

// const xpath = require("xpath");
// const parse5 = require("parse5");
// const xmlser = require("xmlserializer");
// const dom = require("xmldom").DOMParser;

// function readHTML(html) {
//     const document = parse5.parse(html);
//     const xhtml = xmlser.serializeToString(document);
//     const doc = new dom().parseFromString(xhtml);
//     const select = xpath.useNamespaces({ "x": "http://www.w3.org/1999/xhtml" });
//     // console.log(select("head", doc));
//     // console.log(select("/", doc));
//     console.log(select("/html/head/title", doc));
//     console.log(select("/html/head/title[1]/text()", doc));
//     console.log(select("/html/head/title[1]/text()", doc));
//     // console.log(nodes);
// }

// The API that returns the in-email representation.
module.exports = function(req, res) {
    console.log("called");
    const url = req.query.url.trim();
    console.log(url);

    // Giphy image urls are in the format:
    // http://giphy.com/gifs/<seo-text>-<alphanumeric id>
    const matches = url.match(/ebay\.com\/itm\/(.+)\//);
    if (!matches) {
        res.status(400).send("Invalid URL format");
        return;
    }

    request(url, function(error, response, body) {
        if (!error) {
            console.log("used");
            console.log(body);
            // readHTML(body);

            console.log(getTitle(body));
            console.log(getRatings(body));
            console.log(getReviews(body));
            console.log(getImageURL(body));
            console.log(getPrice(body));
            // const image = response.body.data.images.original;
            // const width = image.width > 600 ? 600 : image.width;
            const html = "<div style=\"display: -webkit-box\"><div><img src=\"http://i.ebayimg.com/images/i/131644763083-0-1/s-l1000.jpg\" width=\"100px\"></div><div><h4>Gold 80000mAh Dual USB Portable Solar Battery Charger Power Bank For Cell Phone</h4><p>US $9.89</p><a href=\"http://google.com\" target=\"_blank\">4.89</a><a href=\"http://google.com\" target=\"_blank\">15 product ratings</a></div></div>";
            res.json({
                body: html
                    // Add raw:true if you're returning content that you want the user to be able to edit
            });
        } else {
            console.log(error);
            res.status(500).send("Error");
            return;
        }
    });
    // const id = matches[1];
    // console.log(id);
    // const response = request({
    //   url: url,
    //   qs: {
    //     api_key: "dc6zaTOxFJmzC"
    //   },
    //   gzip: true,
    //   json: true,
    //   timeout: 15 * 1000
    // }, function(err, response) {
    //   if (err) {
    //     res.status(500).send("Error");
    //     return;
    //   }

    //   console.log("used");
    //   console.log(body);
    //   // const image = response.body.data.images.original;
    //   // const width = image.width > 600 ? 600 : image.width;
    //   const html = "<div><img src="https://d1qb2nb5cznatu.cloudfront.net/users/572921-large?1440654205"><h1>Shashank Bharadwaj</h1><p>3 years developing complex full-stack javascript applications, managing small teams, and building products from the ground up.</p></div>";
    //   res.json({
    //     body: html
    //       // Add raw:true if you're returning content that you want the user to be able to edit
    //   });
    // });
};

// const matches = "http://www.ebay.com/itm/Gold-80000mAh-Dual-USB-Portable-Solar-Battery-Charger-Power-Bank-For-Cell-Phone-/131644763083".match(/ebay\.com\/itm\/(.+)\//);
// console.log("yolo")
//     if (!matches) {
//         res.status(400).send("Invalid URL format");
//         console.log("not a match");
//     } else {
//         console.log("Match!");
//     }