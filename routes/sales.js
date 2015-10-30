exports.searchSales = function(req, res, next){
	req.getConnection(function(err, connection){

			var pullProductsEarnings = req.params.query;
				pullProductsEarnings = '%' + pullProductsEarnings + '%';

		connection.query('SELECT Sales_td.Product_id, SUM(Sales_td.qTy * Sales_td.product_price) AS Tot_Earnings_Per_Product, Product_name FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id WHERE Products_td.Product_name LIKE ? group by Products_td.Product_name ASC', [pullProductsEarnings,pullProductsEarnings], function(err, results){
				if(err)
					return next("error selecting : %s ", err)

				res.render('searchProductsEarnings',{
					searchSalesVals : results,
					layout : false
				});
		});

	});

}

exports.searchSalesSum = function(req, res, next){
	req.getConnection(function(err, connection){
			var pullSumOfEarnings = req.params.query;
				pullSumOfEarnings = '%' + pullSumOfEarnings + '%';

		connection.query('SELECT Categories_td.Category_name, SUM(Sales_td.qTy * Sales_td.product_price) AS Tot_Earnings_Per_Product, Product_name FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id INNER JOIN Categories_td ON Products_td.Category_id = Categories_td.id WHERE Product_name LIKE ? OR Categories_td.Category_name like ? group by Products_td.Product_name ASC', [pullSumOfEarnings,pullSumOfEarnings], function(err, results){
				if(err)
					return next("error selecting : %s ", err)

				res.render('searchSalesSum',{
					pullAllSales: results,
					layout : false
				});

		});

	});

}

exports.searchEarningsPerCategory = function(req, res, next){
			var pullCategoryName = req.params.query;
				pullCategoryName = '%'+ pullCategoryName +'%';

	req.getConnection(function(err, connection){

			var getCategoryName = 'SELECT Categories_td.Category_name, SUM(Sales_td.qTy * Sales_td.product_price) AS Tot_Earnings_Per_Product FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id INNER JOIN Categories_td ON Products_td.Category_id = Categories_td.id WHERE Category_name LIKE ? group by Categories_td.Category_name ASC';	
		connection.query(getCategoryName,[pullCategoryName,pullCategoryName], function(err, results){
			console.log(results)
				if(err)
					return('error searching : %s', err)

				res.render('searchEarningPerCategory',{
						pullCategoryNameAsAResult : results,
						layout : false
				});

		});

	});

}
exports.show = function(req, res, next){
			var id = req.params.id;
			var data = JSON.parse(JSON.stringify(req.body));

	req.getConnection(function(err,connection){

		connection.query('SELECT Categories_td.Category_name, SUM(Sales_td.qTy * Sales_td.product_price) AS Tot_Earnings_Per_Product, Product_name FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id INNER JOIN Categories_td ON Products_td.Category_id = Categories_td.id group by Products_td.Product_name', [],function(err,results){
			if(err)
				return next("error selecting : %s ", err);

				res.render('sales' ,{
					Sales : results
				});			
		});
	});

}

exports.showCategories = function(req, res, next){
			var id = req.params.id;
			var data = JSON.parse(JSON.stringify(req.body));

	req.getConnection(function(err ,connection){
				
		connection.query('SELECT Categories_td.Category_name, SUM(Sales_td.qTy * Sales_td.product_price) AS Tot_Earnings_Per_Product, Product_name FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id INNER JOIN Categories_td ON Products_td.Category_id = Categories_td.id group by Products_td.Product_name',[] ,function(err, EarningsPerProductsCategory){
				if(err)
					return next("error selecting : %s " ,err)
				
				res.render('salesSummary', {
					sumOfEarnings : EarningsPerProductsCategory
			});
		});

	});

}
exports.EarningsPerCategory = function(req, res, next){
		var id = req.params.id;
		var data = JSON.parse(JSON.stringify(req.body));

	req.getConnection(function(err ,connection){
				
		connection.query('SELECT Categories_td.Category_name, SUM(Sales_td.qTy * Sales_td.product_price) AS Tot_Earnings_Per_Product FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id INNER JOIN Categories_td ON Products_td.Category_id = Categories_td.id group by Products_td.Category_id',[] ,function(err, EarningsPerCategoryData){
				if(err)
					return next("error selecting : %s " ,err)
				
				res.render('salesEarningsPerCat', {
					sumOfEarningsPerCategory : EarningsPerCategoryData
				});

		});

	});

}