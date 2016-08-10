'use strict';

 var express = require('express'),
 	exphbs = require('express-handlebars'),
 	mysql = require('mysql'),
 	myConnection = require('express-myconnection'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  morgan = require('morgan'),
  passport = require('passport'),
  flash = require('connect-flash'),
  userAuth = require('./routes/userAuth'),
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

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static files which would be then referenced by its root (/folder/directory/) public_folder will be ignored for file refencing
app.use(express.static(__dirname + '/public'));
// static files which would be then referenced by its root (/folder/directory/) and on this following block /bower_components directory will be ignored for file refencing
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(flash());
// use connect-flash for flash messages stored in session

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)


// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./Data_Storage/config/passport')(passport);

app.get('/', function(req, res) {
  res.render('sign_In'); // load the index.ejs file
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
app.get('/sign_in', userAuth.sign_In)
// process the login form
app.post('/sign_in', passport.authenticate('local-login', {
          successRedirect : '/home', // redirect to the secure profile section
          failureRedirect : '/sign_in', // redirect back to the signup page if there is an error
          failureFlash : true // allow flash messages
  }),
      function(req, res) {
          console.log("hello");

          if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
          } else {
            req.session.cookie.expires = false;
          }
      res.redirect('/');
  });


// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
app.get('/sign_up', userAuth.sign_up)
// process the signup form
app.post('/sign_up', passport.authenticate('local-signup', {
  successRedirect : '/sign_in', // redirect to the secure profile section
  failureRedirect : '/sign_up', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));


// =====================================
// PROFILE SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
app.get('/profile', userAuth.isLoggedIn, userAuth.verifyUser)

// products routes
app.get('/home',function(req, res){
  res.render('home')
});

  // products routes
app.get('/products', products.show);
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
	// 3rd Sales route(s) for salesProfits
app.get('/salesProfits' ,salesProfits.show);
app.get('/salesProfits/search/:query' ,salesProfits.searchProfitsPerProduct);
app.get('/about', products.about);


/*'/productCategories'is being used as our HTTP host name when you type eg this url name - url("http://localhost:2000/productCategories").end
 dont type "end" use text inside "quotes" then our function route  - "function res.render('productsCategories')" will work as an exception.
 for that matter "findProductCategories" function's results/output inside routes is being parsed as"findCatNames" will be rendered */
 // =====================================
 // LOGOUT ==============================
 // =====================================
 app.get('/logout', userAuth.logout);


var port = process.env.port || 2000

app.listen(port, function(){
	console.log('listening on *:' + port);
});
