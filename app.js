'use strict';

var express = require('express'),
 	exphbs = require('express-handlebars'),
 	mysql = require('mysql'),
 	myConnection = require('express-myconnection'),
 	bodyParser = require('body-parser'),
 	session = require('express-session'),	 
 	products = require('./routes/products'),
 	productsCategories = require('./routes/categories');


var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'codex',
      port: 3306,
      database: 'Nels_db'
};

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({secret: "Haha haha", saveUninitialized : false, resave: true, cookie : {maxAge : 5*60000}}));
// app.set("x-powered-by", false);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(express.static(__dirname + '/public' ));


app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.render('home')
}); 


app.get('/products', products.show);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.get('/products/add/', products.showAdd);
app.post('/products/add/', products.add);
app.get('/products/delete/:id', products.delete);

 // Creating routes with templates...

app.get('/addProductsCategories' , function(req, res){
	//Create routes
	res.render('addProductsCategories');	
});

app.get('/productsCategories', productsCategories.show);
app.get('/productsCategories/edit/:id', productsCategories.get);
app.post('/productsCategories/update/:id', productsCategories.update);
app.post('/productsCategories/add/', productsCategories.add);
app.get('/productsCategories/delete/:id', productsCategories.delete);
// app.get('/productsCategories', productsCategories.showLeastPopularProduct);


/*we call "getProductCategories()" therefore "findCatNames = productCategories.findProductCategories();"is being excetuted -
by having original function's method for that instance new variable is must be created so that we prevent to get error of undefined values*/
// 	 
app.get('/message' , function(req, res){
	//Create routes
	res.send('I got it !!!');
	
});

/*'/productCategories'is being used as our HTTP host name when you type eg this url name - url("http://localhost:2000/productCategories").end
 dont type "end" use text inside "quotes" then our function route  - "function res.render('productsCategories')" will work as an exception.
 for that matter "findProductCategories" function's results/output inside routes is being parsed as"findCatNames" will be rendered */

var port = process.env.port || 2001;

app.listen(port, function(){
	console.log('listening on *:' + port);
});
