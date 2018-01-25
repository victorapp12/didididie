
var express = require('express'),
  load = require('express-load'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  helmet = require('helmet'),
  admin = require("firebase-admin"),
  assert = require('assert'),
  request = require('request'), 
  querystring = require('querystring'),
  cookieParser = require('cookie-parser');

global.dev = true;
global.version = "1.0.0";
global.database_link = "mongodb://localhost:27017/database";
global.querystring = querystring;
global.request = request;
global.cookieParser = cookieParser;
global.user = null;  
global.client_id = '90e001358d1e4ffc9dbd814a1d458c9a'; // Your client id
global.client_secret = 'd6f1a0404e1048ec8592ea8148641987'; // Your secret
global.redirect_uri = 'http://localhost:8080/callback/'; // Your redirect uri

var database = database_link;

var uri = database_link;
var options = { promiseLibrary: require('bluebird'), useMongoClient: true };
global.db = mongoose.createConnection(uri, options);
Band = db.model('band-promises', { name: String });

db.on('open', function () {
  assert.equal(Band.collection.findOne().constructor, require('bluebird'));
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
load('models').then('controllers').then('routes').into(app);

app.listen(8080, function () {
  console.log("Listening to 8080");
});



