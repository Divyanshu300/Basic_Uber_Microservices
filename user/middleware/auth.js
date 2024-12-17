const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

exports.auth = async (req , res , next) => {
    try {
        const token = req.cookies.token || req.header.authorization.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                success : false,
                message : "Unauthorized "
            });
        }

        const decode = jwt.decode(token , process.env.JWT_SECRET);

        const user = await userModel.findOne(decode.id);

        if(!user) {
            return res.status(401).json({
                success : false,
                message : "Unauthorized"
            });
        }

        req.user = user;

        next();
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}