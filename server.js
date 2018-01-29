var express = require('express');
var http = require('http');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('port', port);
app.use(express.static(path.join(__dirname, '/dist')));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + port);
});

