exports.search = function(req, res, next) {
  req.getConnection(function(error, connection) {

    var productPullReq = req.params.query;
    productPullReq = "%" + productPullReq + "%";

    connection.query('SELECT Product_id,Product_name, Category_name FROM (SELECT Products_td.Product_id,Products_td.Product_name, Categories_td.Category_name, Products_td.Category_id FROM Products_td, Categories_td where Products_td.Category_id = Categories_td.id) AS prods_cats WHERE Product_name LIKE ? OR Category_name LIKE "%Product_name%" ?', [productPullReq, productPullReq], function(error, results) {
      if (error)
        return next(error);
      connection.query('SELECT id, Category_name FROM Categories_td', [productPullReq], function(err, categoriesResults) {
        if (error) {
          return next("Error Searching : %s ", err);

        }

        res.render('searchProducts', {
          products: results,
          categories: categoriesResults,
          layout: false
        });
      });
    });
  });
};

exports.show = function(req, res, next) {
  var id = req.params.id;
  var data = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err, connection) {
    var findMostPopularProductQuery = 'SELECT SUM(Sales_td.qTy) AS Quantity, Products_td.Product_name FROM Sales_td LEFT JOIN Products_td ON Products_td.Product_id = Sales_td.Product_id WHERE Products_td.Product_id = Sales_td.Product_id group by Product_name ORDER BY SUM(qTy) DESC LIMIT 0,1';
      var findleastPopularProductQuery = 'SELECT SUM(Sales_td.qTy) AS Quantity, Products_td.Product_name FROM Sales_td LEFT JOIN Products_td ON Products_td.Product_id = Sales_td.Product_id WHERE Products_td.Product_id = Sales_td.Product_id group by Product_name ORDER BY SUM(qTy) ASC LIMIT 0,1';
    var categoriesDataPullReq = 'SELECT id, Category_name from Categories_td';

    connection.query(findMostPopularProductQuery, [], function(err, mostPopularProduct) {
      if (err)
        return next("Error Selecting : %s ", err);
      connection.query(findleastPopularProductQuery, [], function(err, leastPopularProduct) {
        if (err)
          return next("Error Selecting : %s ", err);
        connection.query('SELECT Products_td.Product_id, Product_name, Category_name FROM Products_td INNER JOIN Categories_td ON Products_td.Category_id = Categories_td.id', [], function(err, results) {
          if (err)
            return next("Error Selecting : %s ", err);

            res.render('products', {
              products: results,
              mostPopularProduct: mostPopularProduct,
              leastPopularProduct: leastPopularProduct
          });
        });
      });
    });
  });
}

exports.add = function(req, res, next) {
	var input = JSON.parse(JSON.stringify(req.body));
	var data = {
		Product_name: input.Product_name,
		Category_id: input.Category_id
	};

  req.getConnection(function(err, connection) {
    connection.query('insert into Products_td set ?', data, function(err, results) {
      if (err)
        return next("Error inserting : %s ", err);

      res.redirect('/products');
    });
  });
};

exports.showAdd = function(req, res, next) {

  req.getConnection(function(err, connection) {
    connection.query('SELECT * from Categories_td', [], function(err, results) {
      if (err)
        return next("Error Selecting : %s ", err);
      res.render('addProduct', {
        categories: results
      });
    });
  });
};

exports.showEdit = function(req, res, next) {
  var Product_id = req.params.Product_id;

  req.getConnection(function(err, connection) {
    connection.query('SELECT id, Category_name from Categories_td', [], function(err, categoryList) {
      if (err)
        return next("Error Selecting : %s ", err);
      connection.query('SELECT * FROM Products_td WHERE Product_id = ?', [Product_id], function(err, rows) {
        if (err)
          return next("Error Selecting : %s ", err);
        var product = rows[0];
        console.log(product.Category_id);

        var categories = categoryList.map(function(category) {
          console.log(category);
          return {
            id: category.id,
            Category_name: category.Category_name,
            selected: category.id === product.Category_id
          }
        });

        res.render('editProduct', {
          page_title: "Edit Customers - Node.js",
          products: product,
          categories: categories
        });
      });
    });
  });
};

exports.update = function(req, res, next) {
  var data = req.body;
  var Product_id = req.params.Product_id;

  req.getConnection(function(err, connection) {
    connection.query('UPDATE Products_td SET Product_name = ?, Category_id = ? WHERE Product_id = ?', [data.Product_name, data.Category_id, Product_id], function(err, rows, fields) {
      if (err)
        return next("Error Updating : %s ", err);

      res.redirect('/products');
    });
  });
};

exports.delete = function(req, res, next) {
  var Product_id = req.params.Product_id;

  req.getConnection(function(err, connection) {
    connection.query('DELETE FROM Products_td WHERE Product_id = ?', Product_id, function(err, rows) {
      if (err)
        return next("Error deleting : %s ", err);

      res.redirect('/products');
    });
  });
};

exports.showPopularProduct = function(req, res, next) {

  req.getConnection(function(err, connection) {
    connection.query('SELECT SUM(qTy) AS Quantity, Product_id ,Product_name FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.Product_id GROUP BY Product_name ORDER BY SUM(qTy) DESC LIMIT 0,1', [], function(err, results) {
      if (err)
        return next(err);

      res.render('products', {
        mostPopularProduct: results

      });
    });
  });
};

exports.about = function(req, res, next) {
  res.render('about');
};
