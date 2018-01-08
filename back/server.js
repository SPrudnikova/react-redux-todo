const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require("./services/auth");
const router = require('./router');


const app = express();
app.use(passport.initialize());
const port = process.env.API_PORT || 3001;

mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect('mongodb://127.0.0.1:27017/mailAppDb', err => console.log(err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//cors
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
app.use('/', router);

//starts the server and listens for requests
app.listen(port, function () {
  console.log(`api running on port ${port}`);
});