const mongoose = require("mongoose");

let campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments = [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: comment
            
        
         }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);