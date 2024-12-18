const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    drviver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Captain",
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    pickup : {
        type : String,
        required : true
    },
    destination : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["requested" , "accepted" , "started" , "completed"],
        default : "requested"
    },
} , {timestamps : true})

module.exports = mongoose.model('Ride' , rideSchema)