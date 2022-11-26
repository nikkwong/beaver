var url = require('url');
var qs = require('querystring');
var https = require('https');

module.exports = function(basePath, apiKey) {
  console.log('Proxying MongoLab at', basePath, 'with', apiKey);

  // console.log('basePath');
  console.log(basePath);
  basePath = url.parse(basePath);
  // console.log('basePath');
  console.log(basePath);

  // Map the request url to the mongolab url
  // @Returns a parsed Url object
  var mapUrl = module.exports.mapUrl = function(reqUrlString) {
    console.log('reqURlString');
    console.log(reqUrlString);
    var reqUrl = url.parse(reqUrlString, true);
    var newUrl = {
      hostname: basePath.hostname,
      protocol: basePath.protocol
    };

    // console.log('reqUrl');
    // console.log('newUrl');
    console.log(newUrl);
    var query = { apiKey: apiKey};
    for(var key in reqUrl.query) {
      query[key] = reqUrl.query[key];
    }
    // https request expects path not pathname!
    newUrl.path = basePath.pathname + reqUrl.pathname + '?' + qs.stringify(query);
    console.log('newUrl');
console.log(newUrl);
    return newUrl;
  };

  // Map the incoming request to a request to the DB
  var mapRequest = module.exports.mapRequest = function(req) {
    var newReq = mapUrl(req.url);
    newReq.method = req.method;

    console.log('newReqHeaders');
    console.log(req.headers);
    newReq.headers = req.headers || {};
    // We need to fix up the hostname
    newReq.headers.host = newReq.hostname;
    console.log('newReq');
    console.log(newReq);
    return newReq;
  };

  var proxy = function(req, res, next) {
    console.log('REQQQ');
    try {
      var options = mapRequest(req);
      // Create the request to the db
      var dbReq = https.request(options, function(dbRes) {
        console.log('ran second');
        var data = "";
        console.log('dbRes.headers');
        console.log(dbRes.headers);
        res.headers = dbRes.headers;
        console.log('res.headers');
        console.log(res.headers);
        dbRes.setEncoding('utf8');
        dbRes.on('data', function(chunk) {
          // Pass back any data from the response.
          data = data + chunk;
        });
        dbRes.on('end', function() {
          console.log('dbREsodsafdfsadfsfdsnEnd');
          console.log(res.header);
          // res.header('Content-Type', 'application/json');

          console.log('Content-Type application/json');
          res.statusCode = dbRes.statusCode;
          res.httpVersion = dbRes.httpVersion;
          res.trailers = dbRes.trailers;
          res.send(data);
          res.end();
        });
      });
      // Send any data the is passed from the original request
      console.log('ran first');
      dbReq.end(JSON.stringify(req.body));
    } catch (error) {
      console.log('ERROR: ', error.stack);
      res.json(error);
      res.end();
    }
  };

  // Attach the mapurl fn (mostly for testing)
  proxy.mapUrl = mapUrl;
  proxy.mapRequest = mapRequest;
  console.log('proxy');
  console.log(proxy);
  return proxy;
};