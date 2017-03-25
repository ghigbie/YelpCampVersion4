const express     = require("express"),
      bodyParser  = require("body-parser"),
      mongoose    = require("mongoose"),
      app         = express();

// self created packages 
const Campground = require("./models/campground"),
      seedDB     = require("./seeds.js");


mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


app.get("/", function(req, res){
    res.render("landing"); 
});


//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("THERE WAS A PROBLEM - CAMPGROUNDS");
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds}); 
        }
    });
});


//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){ //this is the REST convention - should be the same url
    //get form data
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
   //create a new campgroun and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log("THERE WAS AN ERROR - POST CAMPGROUNDS");
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

// NEW -show form to create a new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});


// SHOW - shows more info aboout one campground - this needs to be positioned AFTER "/campgrounds/new"
app.get("/campgrounds/:id", function(req, res){
    // find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("THERE WAS A PROBLEM - CAMPGROUNDS/:ID");
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
});
// ======================
// COMMENTS ROUTE
// ======================

app.get("/campgrounds/:id/comments/new", function(req, res){
    res.render("comments/new");
});

app.get("*", function(req, res){
    res.render("notFound");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is running"); 
});