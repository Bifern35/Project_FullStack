var express = require('express');
var pgp = require('pg-promise')();
//var db = pgp(process.env.DATABASE_URL);
var db = pgp('postgres://cuxnftrtbtwnao:025dc7a8a11677bf3e8f12d4119c35a45d9ac05201861e7c9b7d771e9419f197@ec2-23-23-80-20.compute-1.amazonaws.com:5432/d47apuacv58qcr?ssl=true')
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.get('/', function(req,res){
    res.render('pages/index');
});
app.get('/index', function(req,res){
    res.render('pages/index');
});

var port = process.env.PORT || 3000;
    app.listen(port, function() {
    console.log('App is running on http://localhost:' + port);
});