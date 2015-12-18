
var express = require('express'),
	app = express(),
    db = require('./db'),
	path = require('path');
	db.config.connect();

app.set('port', (process.env.PORT || 9999));
app.use('/', express.static(path.join(__dirname,'public')));
app.get('/',function(req,res){
	res.sendFile("index.html",{root:path.join(__dirname,"public/app/views")});
});

app.get('/addcode',function(request, response) {     
});
app.post('/getcode', function(request, response) {

});
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

