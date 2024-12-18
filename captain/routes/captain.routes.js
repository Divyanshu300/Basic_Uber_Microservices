const express = require("express");
const { register, login, logout, profile, toggleAvailability } = require("../controllers/captain.controller");
const { auth } = require("../middleware/auth");
const router = express.Router();


router.post("/register" , register);
router.post("/login" , login);
router.get("/logout" , logout);
router.get("/profile" , auth , profile);
router.get("/toggle-availability" , auth , toggleAvailability);

module.exports = router;