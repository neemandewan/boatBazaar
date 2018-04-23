/*
 * Created on Sat Feb 03 2018
 * Prabhab Dewan
 * Copyright (c) 2018
 */

var express = require('express');
var argv = require('minimist')(process.argv.slice(2));
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var subpath = express();

var db = require('./db');
global.__root   = __dirname + '/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/v1", subpath);
var swagger = require('swagger-node-express').createNew(subpath);

app.use(express.static('dist'));

var originsWhitelist = [
  'http://localhost:4200'
];

var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}

// Use cors with options
app.use(cors(corsOptions));

swagger.setApiInfo({
  title: "example API",
  description: "API to do something, manage something...",
  termsOfServiceUrl: "",
  contact: "yourname@something.com",
  license: "",
  licenseUrl: ""
});

app.get('/apidocs', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

// all authorization controllers
var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

// all boat controllers
var BoatController = require(__root + 'boat/BoatController');
app.use('/api/auth/boat', BoatController);

// all purchase controllers
var PurchaseController = require(__root + 'purchase/PurchaseController');
app.use('/api/auth/purchase', PurchaseController);

// Set api-doc path
swagger.configureSwaggerPaths('', 'api-docs', '');
swagger.setAppHandler(app); 
// // Configure the API domain
var domain = 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".')

// Configure the API port
var port = 3000;
if(argv.port !== undefined)
    port = argv.port;
else
    console.log('No --port=xxx specified, taking default port ' + port + '.')

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
console.log('snapJob API running on ' + applicationUrl);


swagger.configure(applicationUrl, '1.0.0');


module.exports = app;