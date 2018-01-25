
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



