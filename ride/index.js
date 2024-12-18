const express = require("express");
const rideRoutes = require("./routes/ride.routes")
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/DB");
const rabbitMq = require("./service/rabbit");

rabbitMq.connect()

const app = express();
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use("/" , rideRoutes)

module.exports = app;