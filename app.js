var express = require('express');
var app = express();
//var path = require('path');

app.set('port', (process.env.PORT || 9999));
app.use('/', express.static(__dirname));
app.get('/',function(req,res){
	res.sendFile("index.html",{root:__dirname});
});
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

