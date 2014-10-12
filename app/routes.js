// app/routes.js

var crud = require('../config/crud'),
    search = require('../config/search');

function MyError(message){
    this.name = "wrong password";
    this.message = message || "Default Message";
}
MyError.prototype = new Error();

var configRouter=  function(app, passport, server) {

    search.connect(server);

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        if(req.user){
            res.render('index.html', { user: JSON.stringify(req.user) });
            console.log('user logged in'+req.user)
        }else{
            console.log('user is null' + req.user);
            res.render('index.html',{ message: req.flash('loginMessage') }); // load the index.ejs file
        }
    });

    app.get('/hero', function(req,res){
        res.render('heroLayout.html',{
            user: JSON.stringify(req.user),
            hero: JSON.stringify({
                name : 'zhaoyun',
                ability : {
                    wu:96,
                    tong: 92,
                    zhi: 80,
                    zheng:20,
                    ti: 90
                },
                img : '',
                history : ''
            })
        });
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        //---req.flash: This is the connect-flash way of getting flashdata in the session.
        // We will create the loginMessage inside our passport configuration
        // render the page and pass in any flash data if it exists
        res.render('login.html', { message: req.flash('loginMessage') });
    });

    /**
     * Response to client login request
     * send the user if success, otherwise send
     * object {
     *      'wrongCode' :   0                   1                   2
     *      'text'      :   server error        wrong password      user not existed
     *      }
     */
    app.post('/login',
        function(req, res, next){
            console.log('lets switch');
            passport.authenticate('local-login',
                function(err,user,info){
                    if(err){
                        res.send({'wrongCode':0, 'text': 'Sorry! server errors here!'});
                        return next(err);
                    }
                    if(!user){
                        if(info.isExisted){
                            console.warn('wrong password');
                            res.send({'wrongCode':1, 'text': 'wrong password'});
                            e = new  MyError("have find it");
                            console.log(e);
                            console.log(e.name + "and message " + e.message);
                            //if use next(); will give error!!!
                            //because next will abort the current stack, when response have not finish its
                            //communication with user!!!
                        }
                        else{
                            res.send({'wrongCode':2, 'text': 'user not existed'});
                        }
                    }
                    if(user){
                        //this is for custom session
                        req.logIn(user, function(err){
                            if(err) return next(err);
                            console.log('get the user and go next' );
                            res.send(user);
                        });
                    }
                }
            )(req, res, next);
        }

//            {
//        successRedirect : '/indexA', // redirect to the secure profile section
//        failureRedirect : '/#!account=login', // redirect back to the signup page if there is an error
//        failureFlash : true // allow flash messages
    );


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.html', { message: req.flash('signupMessage') });
    });

//    process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.html', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/indexA', function(req, res){
        res.render('../indexA.html', {
            user: req.user
        });
    });

};

// route middleware to make sure a user is logged in
var isLoggedIn = function  (req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};

module.exports = {configRouter : configRouter};