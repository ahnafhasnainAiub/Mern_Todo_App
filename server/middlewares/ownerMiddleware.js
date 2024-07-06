const jwt = require("jsonwebtoken")
const verifyToken = async (req, res, next) => {
    try {
        // console.log({ req: req.headers.authorization })
        const token = req?.headers?.authorization?.split(" ")[1]
        if (!token) {
            res.status(201).json({
                message: "Token not found"
            })
        } 


        jwt.verify(token, 'shhhh', function (err, decoded) {
            // if (!decoded) {
            //     return res.status(201).json({
            //         message: "Invalid user"
            //     })
            // }
            if (err)
                return res.status(403).json({
                  success: false,
                  message: "Invalid Token.",
                });

                console.log(decoded);
                console.log(req.params.id);
            req.user = decoded;
            console.log('decoded', decoded);
            next()
        });

        console.log("token", token)
    } catch (err) {
        return res.status(201).json({
            message: "Internal  server error"
        })
    }
}




module.exports = {verifyToken}