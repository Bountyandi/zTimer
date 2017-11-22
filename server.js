var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;

app.get('/', function(req, res) {

  app.use('/', express.static(__dirname + '/public'));

  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});
