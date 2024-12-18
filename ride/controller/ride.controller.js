const rideModel = require("../models/ride.model");


exports.createRide = async (req , res) => {
    try {
        const {pickup , destination} = req.body;

        const newRide = new rideModel({
            user : req.user._id,
            pickup,
            destination
        });

        await newRide.save();
        
        //ASYNCHROMOUS COMUNICATION => LOSELY COUPLED : agar ride service chal rhi hai but captain service fail hojaati hai 
                                                    // tb bhi uska ride service prr koi asar nhi padega
        //{npm i amqplib} isko hrr service mein install krna padega

    }
    catch(error) {

    }
}