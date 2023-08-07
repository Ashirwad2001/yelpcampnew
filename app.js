var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
var mongoose        = require('mongoose');
var Campground      = require("./models/campground");
seedDB              = require("./seeds");

seedDB();
mongoose.connect('mongodb://localhost/YELPCAMP');
// mongoose.connect('mongodb://localhost:27017/yelp_camp')

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


    // Campground.create (
    //   {
    //     name:"Daizy",
    //     image: "",
    //         description : " heyy there"
    //   }, function(err,campground){
    //     if(err){
    //         console.log(err);
    //     } else{
    //         console.log("Newly Created Campground");
    //         console.log(campground);
    //     }
    // });

// var campgrounds = [
//     { name: "Salmon", image: " https://www.google.com/url?sa=i&url=https%3A%2F%2Fnortheastohiofamilyfun.com%2Fcampgrounds-in-ohio%2F&psig=AOvVaw16_FFg7FMZ4Z4nNVZlyM6T&ust=1690913091545000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCW27bEuYADFQAAAAAdAAAAABAD" },
//     { name: "Daizy", image: ""},
//     {name:"Goat", image: ""}
// ]

app.get("/",function(req,res){
    res.render("landing");
    // res.send("heyy");
})

app.get("/campgrounds",function(req,res){
// Get all campgrounds from DB
Campground.find({},function(err,allCampgrounds){
    if(err){
        console.log(err);
    } else{
        res.render("index",{campgrounds:allCampgrounds}); 
    }
});
});

app.post("/campgrounds",function(req,res){
    // get data from form and add back to the campground arry
    var name        = req.body.name;
    var image       = req.body.image;
    var descrp      = req.body.description;

    var newCampground = { name:name,image:image, description :descrp }
    // Create new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else{
            // redirect back to campground page
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
})

// Show show more info
app.get("/campgrounds/:id", function(req,res){
// find campground with provided id
Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
        console.log(err);
    } else{
        // render show tamplet of campground
        res.render("show",{campground:foundCampground});
    }
})
})


app.listen(3000,()=>{
    console.log(" The Blog server has started! ");
});
