/***
 * A very basic CRUD example using MySQL
 */ 
//todo - fix the error handling

exports.show = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err) 
            return next(err);
        connection.query('SELECT * from Categories_td', [], function(err, results) {
            if (err) return next(err);

            res.render( 'productsCategories', {
                products : results
            });
      });
    });
};

exports.add = function (req, res, next) {
    req.getConnection(function(err, connection){

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            Product_name : input.Product_name,
        };

        if (err) 
            return next(err);
        
        connection.query('insert into Categories_td set ?', data, function(err, results) {
            if (err)
              console.log("Error inserting : %s ",err );
         
            res.redirect('/productsCategories');
        });
    });
};

exports.get = function(req, res, next){
    var id = req.params.id;
    req.getConnection(function(err, connection){

        connection.query('SELECT * FROM Categories_td WHERE id = ?', [id], function(err,rows){
            if(err){
                console.log("Error Selecting : %s ",err );
            }

            res.render('editCategoy',{page_title:"Edit Customers - Node.js", data : rows[0]});      
        }); 
    });
};

exports.update = function(req, res, next){

    var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    req.getConnection(function(err, connection){
        connection.query('UPDATE Categories_td SET ? WHERE id = ?', [data, id], function(err, rows){
            
            if (err){
              console.log("Error Updating : %s ",err );
            }
            res.redirect('/productsCategories');
        });
    });
};

exports.delete = function(req, res, next){
    var id = req.params.id;
    req.getConnection(function(err, connection){

        connection.query('DELETE FROM Categories_td WHERE id = ?', [id], function(err,rows){
            if(err){
                console.log("Error Selecting : %s ",err );
            }
            res.redirect('/productsCategories');
        });
         
    });
};

