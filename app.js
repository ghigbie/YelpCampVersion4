const express     = require("express"),
      bodyParser  = require("body-parser"),
      mongoose    = require("mongoose"),
      app         = express();

// self created packages 
const Campground = require("./models/campground");
