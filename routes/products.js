/***
 * A very basic CRUD example using MySQL
 */	
//todo - fix the error handling

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);

		var findMostPopularProductQuery = 'SELECT SUM(qTy) AS Quantity, Product_id ,Product_name FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id GROUP BY Product_name ORDER BY SUM(qTy) DESC LIMIT 0,1';
		var findleastPopularProductQuery = 'SELECT SUM(qTy) AS Quantity, Product_id ,Product_name FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id GROUP BY Product_name ORDER BY SUM(qTy) ASC LIMIT 0,1';

		connection.query(findMostPopularProductQuery, [], function(err, mostPopularProduct){
			if (err) return next(err);

		connection.query(findleastPopularProductQuery, [], function(err, leastPopularProduct){
			if (err) return next(err);

		connection.query('SELECT * from Products_td', [], function(err, results) {
        		if (err) return next(err);

        		// console.log(mostPopularProduct)

    			res.render( 'products', {
    				products : results,
    				mostPopularProduct : mostPopularProduct,
    				leastPopularProduct : leastPopularProduct
    				});
     	 		});

			});
		});
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			console.log(err);

		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
            Product_name : input.Product_name,
            Category_id : input.Category_id
        };

		
		connection.query('insert into Products_td set ?', data, function(err, results) {
        	if (err)
              console.log("Error inserting : %s ",err );
         		console.log(data);

          	res.redirect('/products');
      	});
	});
};

exports.showAdd = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		
    	connection.query('SELECT * from Categories_td', [], function(err, results) {
        	if (err)
              console.log("Error Selecting : %s ",err );
         
          	res.render('addProduct', {
          		categories : results
          	});
      	});
	});
};
exports.showEdit = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		var id = req.params.id;
    	connection.query('SELECT * from Categories_td', [], function(err, results) {
        	if (err)
              console.log("Error Selecting : %s ",err );
         connection.query('SELECT * FROM Products_td WHERE id = ?', [id], function(err,rows){
			if(err)return next(err);

			res.render('editProduct', { page_title:"Edit Customers - Node.js",
			 products : rows[0],
			 categories:results

				});      
			 })
      	});
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function(err, connection){
    	connection.query('UPDATE Products_td SET ? WHERE id = ?', [data, id], function(err, rows){
    		
    		if (err){
              console.log("Error Updating : %s ",err );
    		}
          	res.redirect('/products');
    	});
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){

		connection.query('DELETE FROM Products_td WHERE id = ?', [id], function(err,rows){
			if(err){
    			console.log("Error Selecting : %s ",err );
			}
			res.redirect('/products');
		});
		 
	});
};

exports.showPopularProduct = function(req, res, next){
	req.getConnection(function(err, connection){
		if(err)
			return next(err);
		connection.query('SELECT SUM(qTy) AS Quantity, Product_id ,Product_name FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id GROUP BY Product_name ORDER BY SUM(qTy) DESC LIMIT 0,1', [], function(err, results){
		if (err) 
			return next(err);
    	
    		res.render( 'products', {
    			mostPopularProduct : results

    		});
		});
	});
};
// exports.showLeastPopularProduct = function(req, res, next){
// 	req.getConnection(function(err, connection){
// 		if(err)
// 			return next(err);
// 		connection.query('SELECT SUM(qTy) AS Quantity, Product_id ,Product_name FROM Sales_td INNER JOIN Products_td ON Sales_td.Product_id = Products_td.id GROUP BY Product_name ORDER BY SUM(qTy) ASC LIMIT 0,1', [], function(err, results){
// 		if (err) 
// 			return next(err);
    	
//     		res.render( 'products', {
//     			leastPopularProduct : results

//     		});
// 		});
// 	});
// };

