const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
// making authentication middleware 
const authenticate = async(req , res, next) =>{
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer")){
        return res.status(401).json({success: false, message: "No token found, authorization denied"});
    }

    try{
        const token = authToken.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id;

        next();
    }catch(error){
        if (error.name === "TokenExpiredError"){
            return res.status(401).json({message:"token is expired"})
        };

        return res.status(401).json({success: false, message:"Invalid token"});
    }
};

const restrict = async(req,res) =>{
    const userId = req.userId;
    let user = await User.findById(userId);

    next();
}

module.exports = {authenticate, restrict};