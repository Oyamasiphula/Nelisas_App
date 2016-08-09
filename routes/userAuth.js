exports.sign_In = function(req, res){
  res.render('sign_In', { message: req.flash('loginMessage')})
}

exports.sign_up = function(req, res){
  res.render('sign_up', { message: req.flash('signupMessage') })
}

































exports.checkUser = function(req, res, next){
  if (req.session.user){
      // calling the next function - just proceeds to the route.
      return next();
  }
  // the user is not logged in redirect them to the login page
  res.redirect('login');
};
