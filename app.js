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
    salesProfits = require('./routes/salesProfits'),
    suppliers = require("./routes/suppliers");

var app = express();

var dbOptions = {
  host: 'localhost',
  user: 'nelisa',
  password: 'password',
  port: 3306,
  database: 'Nels_db'
};

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// static files which would be then referenced by its root (/folder/directory/) public_folder will be ignored for file refencing
app.use(express.static(__dirname + '/public'));
// static files which would be then referenced by its root (/folder/directory/) and on this following block /bower_components directory will be ignored for file refencing
app.use('/bower_components', express.static(__dirname + '/bower_components'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
  }))
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
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./Data_Storage/config/passport')(passport);

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
app.get('/sign_in', userAuth.sign_In)
  // process the login form
app.post('/sign_in', passport.authenticate('local-login', {
    successRedirect: '/home', // redirect to the secure profile section
    failureRedirect: '/sign_in', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
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
app.get('/', userAuth.sign_up)
  // process the signup form
app.post('/', passport.authenticate('local-signup', {
  successRedirect: '/sign_in', // redirect to the secure profile section
  failureRedirect: '/', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

// =====================================
// PROFILE SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the checkIfAuthorized function)
app.get('/profile', userAuth.checkIfAuthorized, userAuth.verifyUser);

// welcome screen route
app.get('/home', userAuth.checkIfAuthorized, function(req, res) {
  res.render('home', {
    user: req.user
  });
});
// products routes
app.get('/products', userAuth.checkIfAuthorized, products.show);
app.get('/products/search/:query', userAuth.checkIfAuthorized, products.search);
app.get('/products/add/', userAuth.checkIfAuthorized, products.showAdd);
app.post('/products/add/', userAuth.checkIfAuthorized, products.add);
app.get('/products/edit/:Product_id', userAuth.checkIfAuthorized, products.showEdit);
app.post('/products/edit/update/:Product_id', userAuth.checkIfAuthorized, products.update);
app.get('/products/delete/:Product_id', userAuth.checkIfAuthorized, products.delete);

// productsCategories routes
/*'/productCategories'is being used as our HTTP host name when you type eg this url name - url("http://localhost:2000/productCategories").end
 dont type "end" use text inside "quotes" then our function route  - "function res.render('productsCategories')" will work as an exception.
 for that matter "findProductCategories" function's results/output inside routes is being parsed as"findCatNames" will be rendered */
app.get('/addProductsCategories', userAuth.checkIfAuthorized, productsCategories.showAdd);
app.get('/productsCategories', userAuth.checkIfAuthorized, productsCategories.show);
app.get('/productsCategories/search/:query', productsCategories.searchCategories)
app.get('/productsCategories/edit/:id', userAuth.checkIfAuthorized, productsCategories.get);
app.post('/productsCategories/update/:id', userAuth.checkIfAuthorized, productsCategories.update);
app.post('/productsCategories/add/', userAuth.checkIfAuthorized, productsCategories.add);
app.get('/productsCategories/delete/:id', userAuth.checkIfAuthorized, productsCategories.delete);

// Sales routes
app.get('/sales', userAuth.checkIfAuthorized, sales.showSales);
app.get('/sales/search/:query', userAuth.checkIfAuthorized, sales.searchSales);
app.get('/sales/showAddSales/', userAuth.checkIfAuthorized, sales.showAddSales)
app.post('/sales/add', userAuth.checkIfAuthorized, sales.add);
app.get('/sales/edit/:id', userAuth.checkIfAuthorized, sales.editSales);
app.post('/sales/edit/:id/', userAuth.checkIfAuthorized, sales.update);

// 2nd Sales route(s) for salesSummary
app.get('/salesSummary/showCategories', userAuth.checkIfAuthorized, sales.showCategories);
app.get('/salesSummary/earningsPerCategory/search/:query', userAuth.checkIfAuthorized, sales.searchEarningsPerCategory);
app.get('/salesSummary/showCategories/search/:query', userAuth.checkIfAuthorized, sales.searchSalesSum);
app.get('/salesSummary/earningsPerCategory', userAuth.checkIfAuthorized, sales.earningsPerCategory);
// 3rd Sales route(s) for Profits
app.get('/salesProfits', userAuth.checkIfAuthorized, salesProfits.show);
app.get('/salesProfits/search/:query', userAuth.checkIfAuthorized, salesProfits.searchProfitsPerProduct);
app.get('/about', userAuth.checkIfAuthorized, products.about);
//4th suppliers route(s)
app.get('/suppliers', userAuth.checkIfAuthorized, suppliers.show);
app.post('/spazaSuppliers/add/', userAuth.checkIfAuthorized, suppliers.addSupplier);
app.get('/addSpazaSuppliers/', userAuth.checkIfAuthorized, suppliers.showAddSupplier);
app.get('/suppliers/edit/:id', userAuth.checkIfAuthorized, suppliers.showEditSupplier);
app.post('/suppliers/edit/:id', userAuth.checkIfAuthorized, suppliers.update);
app.get('/suppliers/delete/:id', userAuth.checkIfAuthorized, suppliers.delete);

  // =====================================
  // LOGOUT ==============================
  // =====================================
app.get('/logout', userAuth.logout);

const port = process.env.PORT || 8080

app.listen(port, function() {
  console.log('listening on *:' + port);
});
