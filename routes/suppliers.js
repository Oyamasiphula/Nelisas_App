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
