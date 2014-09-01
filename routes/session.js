module.exports = function(app, passport) {
    
    /**
    * Displaying login form
    */

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') })
    });

    /**
    * Process login
    */

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFash: true
    }));


    /**
    * displaying register form
    */

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') })
    });

    /**
    * Process signup
    */
    app.post('/signup', passport.authenticate('local-signup', { 
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFash: true  
    }));

    /**
    * logout
    */

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })

};