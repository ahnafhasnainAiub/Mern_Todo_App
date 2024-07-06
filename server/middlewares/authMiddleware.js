const jwt = require("jsonwebtoken");
const User = require("./../Models/userModel")

const authMiddleware = async (req, res, next) => {
   
   const token = req.header("Authorization");

   if(!token){
     return res.status(401).json({ message: "Token not Provided"});
  
   }

   const jwtToken =  token.replace("Bearer", "").trim();
   console.log("Token from auth Middleware", jwtToken);


   try{
    
     const isVerified = jwt.verify(jwtToken, 'shhhh');

     const userData = await User.findOne({ email: isVerified.email }).
     select({
      password: 0,
     });

     console.log(userData);

     //Now i can use this data any where i need
     req.user = userData;
     req.token = token;
     req.userID = userData._id;


     next();

   }catch(err){
    return res.status(401).json({ message: "Unauthorized, Invalid Token Provided"});
   }
   
};

module.exports = { authMiddleware };