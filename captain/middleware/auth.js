const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const blacklistTokenModel = require("../models/blacklistToken.model");

exports.auth = async (req , res , next) => {
    try {
        const token = req.cookies.token || req.header?.authorization?.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                success : false,
                message : "Unauthorized "
            });
        }

        const isBlackListed = await blacklistTokenModel.findOne({token})

        if(isBlackListed) {
            return res.status(401).json({
                success : false,
                message : "Unauthorized "
            });
        }

        const decode = jwt.decode(token , process.env.JWT_SECRET);

        const captain = await captainModel.findOne({_id : decode.id});

        if(!captain) {
            return res.status(401).json({
                success : false,
                message : "Unauthorized"
            });
        }

        req.captain = captain;

        next();
    }
    catch(error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}