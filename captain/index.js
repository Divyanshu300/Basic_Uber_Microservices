const express = require("express");
const captainRoutes = require("./routes/captain.routes");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/DB");
const rabbitMq = require("./service/rabbit");

const app = express();
connectDB();
rabbitMq.connect();//AGAR MICROSERVICES KO COMMUNICATE KRWAANA HAI USING RABBIT MQ TOH UN SB KO EK HI RABBITMQ SE CONNECT KRNA PADEGA

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use("/" , captainRoutes);


module.exports = app;