const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "http://i.imgur.com/nGSZnHN.jpg",
        description: "A nice place to camp with great sky views."
    },
    {
        name: "Granite Mountain's Rest",
        image: "https://s-media-cache-ak0.pinimg.com/originals/9a/85/d8/9a85d8b22e42dd423da0afce92b43d28.jpg",
        description: "A nice place to camp with great mountain views."
    },
    {
        name: "Lake's End",
        image: "http://www.lake-lewisville.org/wp-content/uploads/2012/07/Sycamore-Bend-Campgrounds-2.jpg",
        description: "A nice place to camp with great lake views."
    }
    ];

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds!");
        
    //add a few campgrounds
        data.forEach(function(seed){  //this is inside of the callback so that to keep it called in the right order
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("Added a campgroud.");
                    //create a comment on each created campground
                    Comment.create(
                        {
                            text: "This place is great, but I wish it had wifi :)",
                            author: "Homer of the Illiad"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment!");
                            }
                        });
                }
            });
        });
    });
    
    //add a few comments
}

module.exports = seedDB;    