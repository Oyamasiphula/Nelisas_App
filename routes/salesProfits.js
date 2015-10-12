exports.show = function(req, res, next){
		
		var id = req.params.id ;
		var data = JSON.parse(JSON.stringify(req.body));

		req.getConnection(function(err, connection){

		connection.query('SELECT Sales_td.Product_id, SUM(Sales_td.qTy * Sales_td.product_price) AS Tot_Earnings_Per_Product, Product_name FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id INNER JOIN Categories_td ON Products_td.Category_id = Categories_td.id group by Product_id' ,function(err ,result){
			console.log(result[0]);
			if(err) 
					return next("error selecting : %s", err)

				res.render('salesProfits',{
						Sales : result
				})

		})

	})

}