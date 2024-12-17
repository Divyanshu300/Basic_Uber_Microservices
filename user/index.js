const express = require("express");
const userRoute = require("./routes/user.routes");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/DB");

const app = express();
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/" , userRoute);


module.exports = app;