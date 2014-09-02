module.exports = function(app, passport) {

    /**
    * Profile section
    * We'll protect this section, user should be loggedin first
    */

    app.get('/profile', isLoggedIn, function(req, res){
        res.render('profile.ejs', { user: req.user });
    });
};


// route middleware to make sure a user is logged in

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if(req.isAuthenticated()){
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');
}
