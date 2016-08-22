exports.sign_In = function(req, res) {
  res.render('sign_In', {
    message: req.flash('loginMessage')
  });
};
exports.sign_up = function(req, res) {
  res.render('sign_up', {
    message: req.flash('signupMessage')
  })
};
exports.verifyUser = function(req, res) {
  res.render('profile', {
    user: req.user // get the user out of session and pass to template
  });
};
// route middleware to make sure
exports.checkIfAuthorized = function(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
};
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/sign_in');
};
