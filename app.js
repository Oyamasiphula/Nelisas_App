'use strict';

 var express = require('express'),
 	exphbs = require('express-handlebars'),
 	mysql = require('mysql'),
 	myConnection = require('express-myconnection'),
 	bodyParser = require('body-parser'),
 	session = require('express-session'),	 
 	products = require('./routes/products'),
 	productsCategories = require('./routes/categories'),
 	sales = require('./routes/sales'),
 	salesProfits = require('./routes/salesProfits');


var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'nelisa',
      password: 'password',
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


app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.render('home')
}); 

// products routes
app.get('/products/', products.show);
app.get('/products/search/:query',products.search);
app.get('/products/edit/:id', products.showEdit);
app.post('/products/edit/:id', products.update);
app.get('/products/add/', products.showAdd);
app.post('/products/add/', products.add);
app.get('/products/delete/:id', products.delete);

	// productsCategories routes
app.get('/addProductsCategories' , productsCategories.showAdd);
app.get('/productsCategories', productsCategories.show);
app.get('/productsCategories/search/:query',productsCategories.searchCategories)
app.get('/productsCategories/edit/:id', productsCategories.get);
app.post('/productsCategories/update/:id', productsCategories.update);
app.post('/productsCategories/add/', productsCategories.add);
app.get('/productsCategories/delete/:id', productsCategories.delete);

	// Sales routes
app.get('/sales', sales.showSales);
app.get('/sales/search/:query', sales.searchSales);
app.get('/sales/showAddSales/', sales.showAddSales)
app.post('/sales/add', sales.add);
app.get('/sales/edit/:id', sales.editSales);
app.post('/sales/edit/:id/', sales.update);

	// 2nd Sales route(s) for salesSummary
app.get('/salesSummary/showCategories', sales.showCategories);
app.get('/salesSummary/earningsPerCategory/search/:query', sales.searchEarningsPerCategory);
app.get('/salesSummary/showCategories/search/:query', sales.searchSalesSum);
app.get('/salesSummary/earningsPerCategory', sales.earningsPerCategory);

	// 3nd Sales route(s) for salesProfits
app.get('/salesProfits' ,salesProfits.show);
app.get('/salesProfits/search/:query' ,salesProfits.searchProfitsPerProduct);
app.get('/about', products.about);


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

var port = process.env.port || 2002;

app.listen(port, function(){
	console.log('listening on *:' + port);
});
