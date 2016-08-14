exports.show = function(req, res, next) {
  req.getConnection(function(err, connection) {
    connection.query('select * from Suppliers_td', [], function(err, result) {
      if (err)
        return next("Error Selecting : %s ", err);
      res.render('suppliers', {
        suppliers: result
      });
    });
  });
};

exports.showaddSupplier = function(req, res, next) {
  req.getConnection(function(err, connection) {
    connection.query('SELECT * from Suppliers_td', [], function(err, results) {
      if (err)
        return next("Error Selecting : %s ", err);

      res.render('addSuppliers', {
        suppliers: results
      });
    });
  });
}


exports.addSupplier = function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
		Supplier_name: input.Supplier_name,
	};

  req.getConnection(function(err, connection) {
    connection.query('insert into Suppliers_td set ?', data, function(err, result) {
      if (err)
        return next("Error inserting : %s ", err);

      res.redirect('/suppliers');
    });
  });
}
