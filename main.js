var express = require('express');
var mysql = require('./dbcon.js');
//var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
//app.use(bodyParser.urlencoded({extended:true}));
//app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
//app.set('mysql', mysql);
//app.use('/', express.static('public'));

app.get('/', function(req, res, next){
    res.status(200).render('index');
})


app.get('/login', function(req, res, next){
    res.status(200).render('login');
})

app.get('/admin', function(req, res, next){
    res.status(200).render('admin');
})

app.get('/signup', function(req, res, next){
    res.status(200).render('signup');
})

app.get('/search', function(req, res, next){
    res.status(200).render('search');
})

app.get('/userProfile', function(req, res, next){
    res.status(200).render('userProfile');
})

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
