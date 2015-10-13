exports.show = function(req, res, next){
		
		var id = req.params.id ;
		var data = JSON.parse(JSON.stringify(req.body));

		req.getConnection(function(err, connection){

		connection.query('SELECT Products_td.id,Products_td.Product_name, (SELECT SUM(Sales_td.qTy * Sales_td.product_price) FROM Sales_td WHERE Product_id = Products_td.id)-(SELECT SUM(Purchases_td.qTy * Purchases_td.product_price) FROM Purchases_td WHERE Product_id = Products_td.id) AS Profits FROM Products_td GROUP BY Products_td.id' ,function(err ,result){
			console.log(result);
			if(err) 
					return next("error selecting : %s", err)

				res.render('salesProfits',{
						Sales : result
				})

		})

	})

}