var express = require('express'),
 	exphbs = require('express-handlebars'),
 	mysql = require('mysql'),
 	myConnection = require('express-myconnection'),
 	bodyParser = require('body-parser'),
 	session = require('express-session'),
 	fileName = 'data/NelisaSalesHistory.csv',
 	csvReader = require('./routes/sales_file_utilities'),
 	productsCatsUtil = require('./routes/productCats'),
 	products = require('./routes/Nelisa_Spaza_Sales'),
 	prod_categories = require('./routes/products_Categories'),
 	mostPopularCategories = require('./routes/mostPopularCategory');

var dbOptions = {
		host: 'localhost',
		user: 'uber',
		password: 'Uber_Uber123',
		port: 3306,
		database: 'uber_data'
	};

var app = express();

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

var getQtyPerProd = function(){
	var salesLines = csvReader.getSales(fileName);
 	var productsTotQty = csvReader.getQtyPerProduct(salesLines)
	var productList = [];

	for(var productName in productsTotQty){
		var product = {
			name : productName,
			qty : productsTotQty[productName]
		};

		productList.push(product);	

	}
 	return productList;
};
var getMostPopularProdIncQty = function(){
	var salesLines = csvReader.getSales(fileName);
	var mostPopularProduct = products.findMostPopularProduct(salesLines);
 	return mostPopularProduct;
}; 

var getleastPopularProdIncQty = function(){
	var salesLines = csvReader.getSales(fileName);
	var leastpopularProduct = products.findLeastPopularProduct(salesLines);
	 return leastpopularProduct;
 	};
 // Creating routes with templates...
app.get('/products', function(req, res){
	res.render('products', 
		{
			products: getQtyPerProd(),
			most_popularProduct: getMostPopularProdIncQty(),
			least_popularProduct: getleastPopularProdIncQty() 
		});
});
app.get('/addProduct' , function(req, res){
	//Create routes
	res.render('addProduct');
});
app.get('/products', products.show);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.post('/products/add', products.add);

//app.post('/products', dataServices.getStockedProducts);

//app.get('/products', dataServices.select_issue);

//Above done with products data only profits data that needs to be displayed

 // below categories data only profits data thats not yet being procesed
var getProductCategories = function(){
	var findCatNames = prod_categories.findProductCategories(); 
	//the reason of not parsing any parameter its that we are calling function that inside this file
 		return findCatNames = [
						    {categoryName : 'Beverages'}, 
						    {categoryName : 'Luxuries'},
						    {categoryName : 'Long_Life_Groceries'},
						    {categoryName : 'Short_Life_Groceries'},
						    {categoryName : 'Novelty_Goods'},
						    {categoryName : 'Fruit'},
						    {categoryName : 'Tinned_Food'}			]
 	};


var getTotQtyProductsCategory = function(){
 	var salesLines = csvReader.getSales(fileName);
	var totQtyPerProductsCategories = products.findQtyPerProductsCategory(salesLines);
 	return totQtyPerProductsCategories;
 };

 var getMostPopularCategory = function(){
 	var salesLines = csvReader.getSales(fileName);
 	var mostPopularProductCategoryIncTotQty = mostPopularCategories.findMostPopularCategory(salesLines);
 	return mostPopularProductCategoryIncTotQty;
 }

 var getleastCategoryProdIncQty = function(){
 	var salesLines = csvReader.getSales(fileName);
 	var leastProductsCategoryIncTotQty = products.findLeastPopularCategory(salesLines);
 	return leastProductsCategoryIncTotQty;
 }
 // var getProfitsPerProductsCategory = function(){
 // 	var salesLines = csvReader.getSales(fileName);
 // 	var profitsPerProductsCategory = products.findLeastPopularCategory(salesLines);
 // 	return profitsPerProductsCategory;
 // }

 // Creating routes with templates...
app.get('/productsCategories', function(req, res){
	//catNames was an object "cats" in routes and then converted to an array now that we can use "catNames" with our eg with mustache{{this.catNames}}
	res.render('productsCategories', 
			{	 totalQtyPerProdsCategory: getTotQtyProductsCategory() ,
				 categories: getProductCategories(),
				 most_PopularCategory: getMostPopularCategory(),
				 least_PopularCategory: getleastCategoryProdIncQty()
			});
app.get('/addProductCategories', function(req,res){

			res.render('addProductCategories')
	})

/*we call "getProductCategories()" therefore "findCatNames = productCategories.findProductCategories();"is being excetuted -
by having original function's method for that instance new variable is must be created so that we prevent to get error of undefined values*/
});
app.get('/message' , function(req, res){
	//Create routes
	res.send('I got it !!!');
	
});

/*'/productCategories'is being used as our HTTP host name when you type eg this url name - url("http://localhost:2000/productCategories").end
 dont type "end" use text inside "quotes" then our function route  - "function res.render('productsCategories')" will work as an exception.
 for that matter "findProductCategories" function's results/output inside routes is being parsed as"findCatNames" will be rendered */

var port = process.env.port || 2400;

app.listen(port, function(){
	console.log('listening on *:' + port);
});
