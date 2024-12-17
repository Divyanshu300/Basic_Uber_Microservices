const mongoose = require("mongoose");

exports.connectDB = async() => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((error) => {
        console.log("Error in connecting to database: " , error)
    })
};

