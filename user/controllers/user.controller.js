const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");

exports.register = async (req , res) => {
    try {
        const {name , email , password} = req.body;

        if(!name , !password) {
            return res.status(400).json({
                success : false,
                message : "All fields are required",
            });
        }

        const user = await userModel.findOne({email});

        if(user) {
            return res.status(400).json({
                success : false,
                message : "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        
        const newUser = await userModel.create({
            name ,
            email ,
            password : hashedPassword
        });

        const token = jwt.sign({id : newUser._id} , process.env.JWT_SECRET , {expiresIn : "24h"});

        res.cookie('token' , token);

        res.status(201).json({
            success : true,
            message : "User created successfully"
        })
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : "Cannot register User"
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

        const user = await userModel.findOne({email}).select("+password");

        if(!user) {
            return res.status(400).json({
                success : false,
                message : "Invalid Email or Password" 
            });
        }

        const isMatch = bcrypt.compare(password , user.password);

        if(!isMatch) {
            return res.status(400).json({
                success : false,
                message : "Invalid Email or Password"
            });
        }

        const token = jwt.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : "1h"});

        res.cookie("token" , token);

        res.status(200).json({
            success : true,
            message : "User LoggedIn Successfully"
        });
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : "Error logging User"
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
            message : "User LoggedOut Successfully"
        })
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : "Could not log out User"
        })
    }
};

exports.profile = (req , res) => {
    try {
        const user = req.user;

        res.status(200).json({
            success : false,
            message : "User Details fetched successfully",
            user : user
        })
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : "Could not fetch User details"
        })
    }
}