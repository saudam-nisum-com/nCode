
var express = require('express'),

	app = express(),
    db = require('./db'),
	path = require('path');
	db.config.connect();

    db = require('./db');

 var app = express();
     db.config.connect();


var express = require('express');
var app = express();
var path = require('path');



app.set('port', (process.env.PORT || 9999));
app.use('/', express.static(path.join(__dirname,'public')));
app.get('/',function(req,res){
	res.sendFile("index.html",{root:path.join(__dirname,"public/app/views")});
});

app.get('/addcode',function(request, response) {     
});
app.post('/getcode', function(request, response) {

});

        
        var query = db.config.query('insert into codeshelf(temp_id,date,comments) values(' + "'" + temp_id + "'" + "," + "'" + date + "'" + "," + "'" + comments + "'" + ');', function(req, res) {
            console.log(res);
            response.send(res);
        });
        console.log(query.sql);
    });


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

