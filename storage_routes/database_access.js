app.get('/productsCategories', function(req, res) {
        req.getConnection(function(err,connection){
        var query = connection.query("select * from Categories_td",function(err,rows){
                if(err){
//fire when send a error from mysql server
                    res.redirect('/productsCategories');
                }
                else{
                    console.log(rows);
                    res.redirect('/');        
                }
            });
    });
    res.render('index', {title:'test title'});
});