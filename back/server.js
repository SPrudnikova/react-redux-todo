const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const router = require('./router');
const setupPassportSerialization = require('./services/auth');

const port = process.env.API_PORT || 3001;
const MongoStore = require('connect-mongo')(session);
const app = express();

mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect('mongodb://127.0.0.1:27017/mailAppDb', err => console.log(err));
app.use(session({
  secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
  resave: true,
  saveUninitialized: false,
  name: "user",
  expires: new Date(Date.now() + (60 * 60 * 24 * 7 * 1000)),
  cookie: {},
  store: new MongoStore({
    url: 'mongodb://127.0.0.1:27017/mailAppDb',
    collection: 'sessions'
  })
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
setupPassportSerialization();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cors
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//set the route path & initialize the API
app.get('/api', function (req, res) {
  res.json({message: 'API Initialized!'});
});

// other URLs
app.use(router);

//starts the server and listens for requests
app.listen(port, function () {
  console.log(`api running on port ${port}`);
});
