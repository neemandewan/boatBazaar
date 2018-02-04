/*
 * Created on Sat Feb 03 2018
 * Prabhab Dewan
 * Copyright (c) 2018
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var db = require('./db');
global.__root   = __dirname + '/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

// users controller for registration
var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);

// all authorization controllers
var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

// all boat controllers
var BoatController = require(__root + 'boat/BoatController');
app.use('/api/auth/boat', BoatController);

module.exports = app;