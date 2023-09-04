
var express    = require("express");
var passport   = require("passport");
var router     = express.Router();
var User       = require("../models/user");

// Root Route
router.get("/",function(req,res){
    res.render("landing");
    // res.send("heyy");
})

// Register Form Route
router.get("/register", function(req,res){
    res.render("register");
})

// Handle Sign up logic
router.post("/register",function(req ,res){
 var newUser = new User({ username: req.body.username})
    User.register( newUser, req.body.password, function(err,user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        } 
        passport.authenticate("local")(req,res, function(){
            req.flash("success" , "Welcome To YelpCamp" + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
router.get("/login",function(req,res){
    res.render("login");
})
// Handling Login logic
router.post("/login", passport.authenticate("local",
{
    successRedirect :"/campgrounds",
    failureRedirect :"/login"
}),function(req,res){

})

// Logout routes
router.get("/logout",function(req,res){
    console.log("logging out")
    req.logout();
    // req.flash("error", "Logged You Out!");
        res.redirect("/campgrounds");
});


module.exports = router;