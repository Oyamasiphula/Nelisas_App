exports.searchSales = function(req, res, next){
	req.getConnection(function(err, connection){

			var pullProductsEarnings = req.params.query;
				pullProductsEarnings = '%' + pullProductsEarnings + '%';

		connection.query('SELECT id,Product_name, Category_name FROM (SELECT Products_td.id,Products_td.Product_name, Categories_td.Category_name, Products_td.Category_id FROM Products_td, Categories_td where Products_td.Category_id = Categories_td.id) AS prods_cats WHERE Product_name LIKE ? OR Category_name LIKE ?',[pullProductsEarnings, pullProductsEarnings],function(err, productsEarningsResults){
					console.log(productsEarningsResults)
				if(err)
						return next("error selecting : %s ", err)


			res.render('searchProductsEarnings',{
				findProductNames : productsEarningsResults,
				layout : false
			})
		})

	})

}

exports.show = function(req, res, next){
			
	var id = req.params.id;
	var data = JSON.parse(JSON.stringify(req.body));

	req.getConnection(function(err,connection){

		connection.query('SELECT Sales_td.Product_id, SUM(Sales_td.qTy * Sales_td.product_price) AS Tot_Earnings_Per_Product, Product_name FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id INNER JOIN Categories_td ON Products_td.Category_id = Categories_td.id group by Product_id', [],function(err,results){
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
					})
				})

			})

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
						})
				})

			})

	}