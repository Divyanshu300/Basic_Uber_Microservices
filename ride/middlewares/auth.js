const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");
const BASE_URL = process.env.BASE_URL;

exports.auth = async (req , res , next) => {
    try {
        const token = req.cookies.token || req.header?.authorization?.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                success : false,
                message : "Unauthorized "
            });
        }

        const decode = jwt.decode(token , process.env.JWT_SECRET);

        const response = await axios.get(`${BASE_URL}/user/profile` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });//YE JO RIDE SE USER PRR HMM LOG COMUNICATE KIYE HAI ISKO KEHTE HAI SYNCHRONOUS COMUNICATION
        //DISADVANTAGE -> AB RIDE SERVICE DEPEND HO GYI HAI USER SERVICE PRR (user service down hui toh ride waali bhi ho jayegi)
        //MICROSERVICE BNTI HI HAI TAAKI AGAR EK DOWN HUI TOH BAAKI PRR FARAK NHI PADEGA

        const user = response.data;

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