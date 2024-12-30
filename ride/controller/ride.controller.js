const { publishToQueue } = require("../../captain/service/rabbit");
const rideModel = require("../models/ride.model");


exports.createRide = async (req , res) => {
    try {
        const {pickup , destination} = req.body;

        const newRide = new rideModel({
            user : req.user._id,
            pickup,
            destination
        });

        
        //ASYNCHROMOUS COMUNICATION => LOSELY COUPLED : agar ride service chal rhi hai but captain service fail hojaati hai 
                                                        // tb bhi uska ride service prr koi asar nhi padega
        //{npm i amqplib} isko hrr service mein install krna padega
        
        publishToQueue("new-ride" , JSON.stringify(newRide));//AGAR SHARE KRNA HAI ISS DATA KO TOH USKO QUEUE MEIN DAAL DO "new-ride" NAAM SE
        
        await newRide.save();
    }
    catch(error) {

    }
}