var mongoose   = require("mongoose");
var Campground  = require("./models/campground");

var data  = [
{
    name:"DAIZY",
    image:"",
    description:"Beautiful Campground"
},
{
    name:"DAIZY",
    image:"",
    description:"Beautiful Campground"
},
{
    name:"DAIZY",
    image:"",
    description:"Beautiful Campground"
}
]
function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Campgrounds");
    })
    // Add a few Campgrounds
    data.forEach(function(seed){
        Campground.create({})

    })

    // add a few comments
};

module.exports  = seedDB;
