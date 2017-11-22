var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {

  app.use('/', express.static(__dirname + '/public'));

  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(3000);
