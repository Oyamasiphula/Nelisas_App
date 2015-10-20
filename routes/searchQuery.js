exports.searchQuery = function(req,res, next){

	// var keyPull = req.params.key;
	var id = req.params.id;
	// var data = JSON.parse(JSON.stringify(req.body));
	var data = [];

	req.getConnection(function(err, connection){

		connection.query('SELECT Products_td.id, Product_name, Category_name FROM Products_td INNER JOIN Categories_td ON Products_td.Category_id = Categories_td.id where Product_name like "%'+req.query.key+'%"', function(err, rows, fields) {
	  		if (err) throw err;
    var data=[];
    		for(i=0;i<rows.length;i++)
      {
        data.push(rows[i].Product_name);

		      }
		       console.log(data)
		      res.end(JSON.stringify(data));
		});
	});
}

// exports.update = function(req, res, next){

// 	var data = JSON.parse(JSON.stringify(req.body));
//     var id = req.params.id;

//     req.getConnection(function(err, connection){
//     	connection.query('UPDATE Products_td SET Product_name = ?, Category_id = ? WHERE id = ?', [data.Product_name, data.Category_id, id], function(err, rows, fields){
//     		if (err)
//               		return next("Error Updating : %s ",err);
  
//           	res.redirect('/search');
//     	});
//     });
// };