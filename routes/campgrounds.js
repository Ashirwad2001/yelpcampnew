var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


//show index route
router.get("/",function(req,res){
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
        }
    });

});

//create campground - add new campground to db
router.post("/",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var price = req.body.price;
    var image  =  req.body.image;
    var description = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newCamp = {name:name ,price:price, image:image,description:description,author:author}
    Campground.create(newCamp, function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//show  form to create new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new.ejs");
})


//show more info about a campground
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate('comments').exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});

router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
        Campground.findById(req.params.id,function(err,foundCampground){
            res.render("campgrounds/edit",{campground:foundCampground});
        });
});

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
        console.log("id for delete "+req.params.id);
        Campground.findByIdAndDelete(req.params.id,function(err){
            if(err){
                res.redirect("/campgrounds")
            }else{
                res.redirect("/campgrounds")
            }
        })
})

//middleware


module.exports = router;

    // fuser -k 3000/tcp