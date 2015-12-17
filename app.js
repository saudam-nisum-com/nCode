var express = require('express'),
    db = require('./db');
 
    
   

 var app = express();
     db.config.connect();



app.set('port', (process.env.PORT || 9999));
app.use('/', express.static(__dirname));
app.get('/',function(req,res){
	res.sendFile("index.html",{root:__dirname});
});

app.get('/addcode',function(request, response) {
       
     var query = db.config.query('SELECT * FROM codeshelf', function(req, res) {
            console.log(res);
            response.send(res);
        });
        console.log(query.sql);
    });



app.post('/getcode', function(request, response) {
        
        var query = db.config.query('insert into codeshelf(tname,pname,pst_date) values(' + "'" + tname + "'" + "," + "'" + pname + "'" + "," + "'" + pst_date + "'" + ');', function(req, res) {
            console.log(res);
            response.send(res);
        });
        console.log(query.sql);
    });

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

