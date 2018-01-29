
var express = require('express'),
  load = require('express-load'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  helmet = require('helmet'),
  admin = require("firebase-admin"),
  assert = require('assert'),
  request = require('request'),
  querystring = require('querystring'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  app = express();

var port = process.env.PORT || 8080;
global.dev = true;
global.version = "1.0.0";
global.database_link = "mongodb://root:NlI9yy04Lp0TiiMl@cluster0-shard-00-00-95wkb.mongodb.net:27017,cluster0-shard-00-01-95wkb.mongodb.net:27017,cluster0-shard-00-02-95wkb.mongodb.net:27017/admin?replicaSet=Cluster0-shard-0&ssl=true&authSource=root";
global.querystring = querystring;
global.request = request;
global.cookieParser = cookieParser;
global.client_id = '90e001358d1e4ffc9dbd814a1d458c9a'; // Your client id
global.client_secret = 'd6f1a0404e1048ec8592ea8148641987'; // Your secret
global.redirect_uri = 'https://safe-waters-83512.herokuapp.com/callback/'; // Your redirect uri

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
app.use(cookieParser('didididie'));
app.use(session({
  secret: "Shh, its a secret!",
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
load('models').then('controllers').then('routes').into(app);


var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});
