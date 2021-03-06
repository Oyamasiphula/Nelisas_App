exports.show = function(req, res, next) {
		  var id = req.params.id;
		  var data = JSON.parse(JSON.stringify(req.body));

  req.getConnection(function(err, connection) {
    connection.query('SELECT Products_td.Product_id,Products_td.Product_name, (SELECT SUM(Sales_td.qTy * Sales_td.product_price) FROM Sales_td WHERE Product_id = Products_td.Product_id)-(SELECT SUM(Purchases_td.qTy * Purchases_td.product_price) FROM Purchases_td WHERE Product_id = Products_td.Product_id) AS Profits FROM Products_td GROUP BY Product_id, Profits DESC', function(err, result) {
      if (err)
        return next("error selecting : %s", err)
      connection.query('SELECT Products_td.Product_id,Products_td.Product_name, (SELECT SUM(Sales_td.qTy * Sales_td.product_price) FROM Sales_td WHERE Product_id = Products_td.Product_id)-(SELECT SUM(Purchases_td.qTy * Purchases_td.product_price) FROM Purchases_td WHERE Product_id = Products_td.Product_id) AS Profits FROM Products_td GROUP BY Product_id, Profits DESC LIMIT 1', function(err, showMostProfitableProduct) {
        if (err)
          return next("error selecting : %s", err)
        res.render('salesProfits', {
          Sales: result,
          bestProduct: showMostProfitableProduct[0]
        });
      });
    });
  });
};
exports.searchProfitsPerProduct = function(req, res, next) {
			var pullProductProfit = req.params.query;

  req.getConnection(function(err, connection) {
    pullProductProfit = '%' + pullProductProfit + '%';
    var searchProductName = 'SELECT Products_td.Product_id,Products_td.Product_name, (SELECT SUM(Sales_td.qTy * Sales_td.product_price) FROM Sales_td WHERE Product_id = Products_td.Product_id)-(SELECT SUM(Purchases_td.qTy * Purchases_td.product_price) FROM Purchases_td WHERE Product_id = Products_td.Product_id) AS Profits FROM Products_td WHERE Product_name LIKE ? GROUP BY Products_td.Product_name ASC';

    connection.query(searchProductName, [pullProductProfit, pullProductProfit], function(err, result) {
      if (err)
        return ("error searching : %s", err)
      res.render('searchProfitsPerProduct', {
        productNAmeAsAResult: result,
        layout: false
      });
    });
  });
};
