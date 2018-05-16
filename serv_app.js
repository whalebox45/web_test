var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('short'));

require('./routes')(app);


var server = app.listen(7153, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Web app listening at http://%s:%s", host, port)
})

