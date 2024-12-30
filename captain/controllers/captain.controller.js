const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const { subscribeToQueue } = require("../service/rabbit");

exports.register = async (req , res) => {
    try {
        const {name , email , password} = req.body;

        if(!name , !password) {
            return res.status(400).json({
                success : false,
                message : "All fields are required",
            });
        }

        const captain = await captainModel.findOne({email});

        if(captain) {
            return res.status(400).json({
                success : false,
                message : "captain already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        
        const newCaptain = await captainModel.create({
            name ,
            email ,
            password : hashedPassword
        });

        const token = jwt.sign({id : newCaptain._id} , process.env.JWT_SECRET , {expiresIn : "1h"});

        res.cookie('token' , token);

        delete newCaptain._doc.password; //TO DELETE THE PASSWORD BEFORE SENDING IN RESPONSE TO HIDE IT FROM OTHERS 

        res.status(201).json({
            success : true,
            message : "captain created successfully",
            token,
            newCaptain
        })
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : "Cannot register captain"
        })
    }
};

exports.login = async (req , res) => {
    try {
        const {email , password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            });
        }

        const captain = await captainModel.findOne({email}).select("+password");

        if(!captain) {
            return res.status(400).json({
                success : false,
                message : "Invalid Email or Password" 
            });
        }

        const isMatch = bcrypt.compare(password , captain.password);

        if(!isMatch) {
            return res.status(400).json({
                success : false,
                message : "Invalid Email or Password"
            });
        }

        const token = jwt.sign({id : captain._id} , process.env.JWT_SECRET , {expiresIn : "1h"});

        res.cookie("token" , token);

        delete captain._doc.password; //TO DELETE THE PASSWORD BEFORE SENDING IN RESPONSE TO HIDE IT FROM OTHERS 

        res.status(200).json({
            success : true,
            message : "captain LoggedIn Successfully",
            token,
            captain
        });
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : "Error logging captain"
        })
    }
};

exports.logout = async (req , res) => {
    try {
        const token = req.cookies.token;

        await blacklistTokenModel.create({token});

        res.clearCookie('token');
        
        res.status(200).json({
            success : true,
            message : "captain LoggedOut Successfully"
        })
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : "Could not log out captain"
        })
    }
};

exports.profile = (req , res) => {
    try {
        const captain = req.captain;

        res.status(200).json({
            success : true,
            message : "captain Details fetched successfully",
            captain : captain
        })
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : "Could not fetch captain details"
        })
    }
};
 
exports.toggleAvailability = async (req , res) => {
    try {
        const captain = await captainModel.findById(req.captain._id);
        
        captain.isAvailable = !captain.isAvailable;
        await captain.save();

        res.send(captain);
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

subscribeToQueue("new-ride" , (data) => {
    console.log(data);
})