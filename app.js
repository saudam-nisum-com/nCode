var express = require('express'),
    app = express(),
    db = require('./db'),
    path = require('path');
	db.config.connect();

app.set('port', (process.env.PORT || 9999));
app.use('/', express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile("index.html", {
        root: path.join(__dirname, "public/app/views")
    });
});

app.get('/addcode', function(request, response) {
    var query = db.config.query('insert into codeshelf(temp_id,template_data,date,comments) values(' + "'" + temp_id + "'" + "," + "'" + template_data + "'" + "," + "'" + date + "'" + "," + "'" + comments + "'" + ');', function(req, res) {
        console.log(res);
        response.send(res);
    });
    console.log(query.sql);
});

app.post('/getcode', function(request, response) {

    var query = db.config.query("select * from codeshelf where temp_id =?", [temp_id], function(req, res) {
        //console.log(res);
        response.send(res);
    });
});

app.put('/changes/:id', function(request, response) {
    console.log("inside put");
    var query = db.config.query('update codeshelf set template = ?,comments = ? where id = ?', [template, comments, id], function(req, res) {
        //console.log(res);
        response.send(res);
    });
    console.log(query.sql);
});

app.delete('/delete/:id', function(request, response) {
    console.log("inside delete");
    var ssid = request.params.id;
    var query = db.config.query('delete from codeshelf  where id = ?', [id], function(req, res) {
        console.log(res);
        response.send(res);
    })
});

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});
