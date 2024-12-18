const express = require("express");
const captainRoutes = require("./routes/captain.routes");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/DB");

const app = express();
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/" , captainRoutes);


module.exports = app;