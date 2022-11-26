var fs = require('fs');
var http = require('http');
var path = require('path');
var https = require('https');
// var privateKey = fs.readFileSync(__dirname + '/cert/privatekey.pem').toString();
// var certificate = fs.readFileSync(__dirname + '/cert/certificate.pem').toString();
// var credentials = {
//     key: privateKey,
//     cert: certificate
// };
let config = require('./config');
// var mongoose = require('mongoose');
var express = require('express');
// var mongoProxy = require('./lib/mongo-proxy');
// var xsrf = require('./lib/xsrf');
var passport = require('passport');
// var security = require('./lib/security');
// var protectJSON = require('./lib/protectJSON');
var bodyParser = require('body-parser');
var compression = require('compression');
require('express-namespace');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var express = require('express');

var app = express();
var server = http.createServer(app);

var http = require('http');
app.use(compression());

var server = http.createServer(app);

// mongoose.connect('mongodb://nikkwong:Sabersbutt1!@ds125884-a0.mlab.com:25884,ds125884-a1.mlab.com:25884/instanice?replicaSet=rs-ds125884');
// // mongoose.connect('mongodb://127.0.0.1');
// mongoose.connection.on("connect", function (err) {
//     console.log('mongoose connected');
//     if (err) {
//         console.log(err);
//     }
// });

app.use(require('express-favicon')(path.resolve(__dirname, './assets/beaver.ico')));

// First looks for a static file: index.html, css, images, etc.
app.use(config.server.staticUrl, function (req, res, next) {
    res.setHeader("Cache-Control", "public, max-age=2592000");
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    next()
})
app.use(config.server.staticUrl, express.static(path.resolve(__dirname, './dist')));
app.use(config.server.staticUrl, express.static(path.resolve(__dirname, './assets')));
app.use(config.server.staticUrl, express.static(path.resolve(__dirname, './node_modules')));
app.use(config.server.staticUrl, express.static(path.resolve(__dirname, './assets/sites/bliss/static')));
app.use('/broadcaster/static', express.static(path.resolve(__dirname, './assets/sites/broadcaster/static')));
app.use('/superfamous/static', express.static(path.resolve(__dirname, './assets/sites/superfamous/static')));
app.use('/verdict/static', express.static(path.resolve(__dirname, './assets/sites/verdict/static')));
app.use('/beaver/static', express.static(path.resolve(__dirname, './assets/sites/beaver')));
app.use('/blendful/static', express.static(path.resolve(__dirname, './assets/sites/blendful/static')));
app.use('/digitalbits/static', express.static(path.resolve(__dirname, './assets/sites/digitalbits/static')));
app.use('/jido/static', express.static(path.resolve(__dirname, './assets/sites/jido/static')));
app.use('/outpost/static', express.static(path.resolve(__dirname, './assets/sites/outpost/static')));
app.use('/flyingcarpet/static', express.static(path.resolve(__dirname, './assets/sites/flyingcarpet/static')));
app.use('/junior/static', express.static(path.resolve(__dirname, './assets/sites/junior/static')));
app.use('/veridium/static', express.static(path.resolve(__dirname, './assets/sites/veridium/static')));
app.use('/slice/static', express.static(path.resolve(__dirname, './assets/sites/slice/static')));
app.use('/mevu/static', express.static(path.resolve(__dirname, './assets/sites/mevu/static')));
app.use('/cryptagami/static', express.static(path.resolve(__dirname, './assets/sites/cryptagami/static')));
app.use('/asq/static', express.static(path.resolve(__dirname, './assets/sites/asq/public')));
app.use(config.server.staticUrl, function (req, res, next) {
    res.send(404); // If we get here then the request for a static file is invalid
});
 
// app.use(protectJSON);
app.use(bodyParser.text());
app.use(bodyParser.json());
// app.use(express.bodyParser({uploadDir: './uploads'}));                              // Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method
// app.use(express.cookieParser(config.server.cookieSecret));  // Hash cookies with this secret
// app.use(express.cookieSession());                           // Store the session in the (secret) cookie

// Disable these to work locally -> 

// app.use(passport.initialize());                             // Initialize PassportJS
// app.use(passport.session());                       // Use Passport's session authentication strategy - this stores the logged in user in the session and will now run on any request
// app.use(xsrf);                                            // Add XSRF checks to the request
// security.initialize(config.mongo.dbUrl, config.mongo.apiKey, config.security.dbName, config.security.usersCollection); // Add a Mongo strategy for handling the authentication
app.use('/bliss', (req,res,next) => {
    return res.sendfile('assets/sites/bliss/index.html', {root: ''})
});

app.use('/verdict', (req,res,next) => {
    return res.sendfile('assets/sites/verdict/index.html', {root: ''})
});

app.use('/broadcaster', (req,res,next) => {
    return res.sendfile('assets/sites/broadcaster/index.html', {root: ''})
});
app.use('/fractals', (req,res,next) => {
    return res.sendfile('assets/sites/fractals/index.html', {root: ''})
});

app.use('/cryptagami', (req,res,next) => {
    return res.sendfile('assets/sites/cryptagami/index.html', {root: ''})
});

app.use('/mevu', (req,res,next) => {
    return res.sendfile('assets/sites/mevu/index.html', {root: ''})
});

app.use('/jido', (req,res,next) => {
    return res.sendfile('assets/sites/jido/index.html', {root: ''})
});

app.use('/superfamous', (req,res,next) => {
    return res.sendfile('assets/sites/superfamous/index.html', {root: ''})
});


app.use('/veridium', (req,res,next) => {
    return res.sendfile('assets/sites/veridium/index.html', {root: ''})
});

app.use('/outpost', (req,res,next) => {
    return res.sendfile('assets/sites/outpost/index.html', {root: ''})
});
app.use('/digitalbits', (req,res,next) => {
    return res.sendfile('assets/sites/digitalbits/index.html', {root: ''})
});
app.use('/junior', (req,res,next) => {
    return res.sendfile('assets/sites/junior/index.html', {root: ''})
});
app.use('/flyingcarpet', (req,res,next) => {
    return res.sendfile('assets/sites/flyingcarpet/index.html', {root: ''})
});
app.use('/asq', (req,res,next) => {
    return res.sendfile('assets/sites/asq/index.html', {root: ''})
});
app.use('/slice', (req,res,next) => {
    return res.sendfile('assets/sites/slice/index.html', {root: ''})
});
app.all('*', function (req, res, next) {

    // if (req.hostname === 'beaver.digital')
    // return res.redirect(301, 'https://www.beaver.digital', req.originalUrl);
    return res.sendfile('templates/index.html', {
        root: 'dist'
    });

});

// require('./lib/routes/appFile').addRoutes(app, config);

// A standard error handler - it picks up any left over errors and returns a nicely formatted server 500 error
// app.use(express.errorHandler({
//     dumpExceptions: true,
//     showStack: true
// }));

// Start up the server on the port specified in the config
server.listen(config.server.listenPort, '0.0.0.0', 511, function () {
    console.log('listening you bitch')
    // // Once the server is listening we automatically open up a browser
    // var open = require('open');
});

process.on('uncaughtException', function (err) {
    console.log(err);
});