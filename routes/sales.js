
exports.show = function(req, res, next){
			
			var id = req.params.id;
			var data = JSON.parse(JSON.stringify(req.body));

	req.getConnection(function(err,connection){

		connection.query('SELECT Sales_td.Product_id, SUM(product_price), Product_name FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id group by Product_id', [],function(err,results){
						if(err)
							return next("error selecting : %s ", err)
						console.log(results);

				res.render('sales' ,{
					Sales : results
				});			

			});

		});

	};
// SELECT [1st_table_name].id, [table_column], [table_column] 
// FROM [1st_table_name] INNER JOIN 
// [another_table_name] ON [1st_table_name].[match_colms_by_vals] 
// = [another_table_name].[match_colms_by_vals]