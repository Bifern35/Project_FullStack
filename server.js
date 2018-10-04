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

app.get('/about', function(req,res){
    var name = 'Suthathip Manikan';
    var major = 'Software Engineering';
    var ID = '5930213005';
    res.render('pages/about',{fullname : name, major : major, SID : ID});   
});

app.get('/products', function(req,res){
    var id = req.param('id');
    var sql = 'select * from products';
    if(id){
        sql += ' where id = '+ id; 
    }
        db.any(sql)
        .then(function(data){
            console.log('DATA:'+data);
            res.render('pages/products',{products : data});
        })
        .catch(function(error){
            console.log('ERROR:'+error);
        })
    
});

app.get('/products/:pid', function(req,res){
    var pid = req.params.pid;
    var sql = 'select * from products where id =' + pid;
    db.any(sql)
        .then(function(data){
            res.render('pages/product_edit',{product : data[0]});
        })
        .catch(function(error){
            console.log('ERROR:'+error);
        })
})
app.post('/product/update',function(req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var sql=`update product set title = ${title}, price= ${price} = where id = ${id}`;
    console.log('Update: '+sql);
    res.redirect('/products');

});
var port = process.env.PORT || 3000;
    app.listen(port, function() {
    console.log('App is running on http://localhost:' + port);
});