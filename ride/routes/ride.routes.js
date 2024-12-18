const express = require("express");
const { auth } = require("../middlewares/auth");
const { createRide } = require("../controller/ride.controller");
const router = express.Router();


router.post("/create-ride" , auth , createRide);
// router.post("/login" , login);
// router.get("/logout" , logout);
// router.get("/profile" , auth , profile);
// router.get("/toggle-availability" , auth , toggleAvailability);

module.exports = router;