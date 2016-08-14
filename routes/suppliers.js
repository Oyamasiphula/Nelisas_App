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
};
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
exports.editSupplier = function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    Supplier_name: input.Supplier_name,
  };

  req.getConnection(function(err, connection) {
    connection.query('SELECT * FROM Suppliers_td WHERE id = ?', [id], function(err, result) {
      if (err)
        return next("Error selecting : %s ", err);

      res.redirect('/suppliers');
    });
  });
}

exports.showEditSupplier = function(req, res, next) {
  req.getConnection(function(err, connection) {
    connection.query('SELECT id, Category_name from Categories_td', [], function(err, supplierList) {
      if (err)
        return next("Error Selecting : %s ", err);

      res.render('editSupplier', {
        suppliers: supplierList
      });
    });
  });
}
exports.update = function(req, res, next) {
  var data = JSON.parse(JSON.stringify(req.body));
  var id = req.params.id;

  req.getConnection(function(err, connection) {
    connection.query('UPDATE Suppliers_td SET Supplier_name = ?', [data.Supplier_name, id], function(err, rows, fields) {
      if (err)
        return next("Error Updating : %s ", err);

      res.redirect('/suppliers');
    });
  });
};

exports.delete = function(req, res, next) {
  var id = req.params.id;

  req.getConnection(function(err, connection) {
    connection.query('DELETE FROM Suppliers_td WHERE id = ?', id, function(err, rows) {
      if (err)
        return next("Error deleting : %s ", err);

      res.redirect('/suppliers');
    });
  });
};
