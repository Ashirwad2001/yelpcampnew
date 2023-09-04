var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
var mongoose        = require('mongoose');
var passport        = require("passport");
var LocalStrategy   = require("passport-local");
var flash           = require("connect-flash");
var Campground      = require("./models/campground");
var methodOverride  = require("method-override");
var Comment         = require("./models/comment");
var User            = require("./models/user")
var ObjectId        = require('mongodb').ObjectID;
seedDB              = require("./seeds");

//  Requring Routes
var commentRoutes      = require("./routes/comments"),
    campgroundRoutes   = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");


mongoose.connect('mongodb://localhost/YELPCAMP_V1');
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public")); 
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();


// PASSPORT CONFIG
app.use(require("express-session")({
    secret : "Once again Rusty wins cutest Dog",
    resave: false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error =  req.flash("error");
    res.locals.success =  req.flash("success");

    next();
})


app.use("/" , indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(3000,()=>{
    console.log(" The server has started! ");
});
