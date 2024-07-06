const verifyToken = async (req, res, next) => {
    try {
        // console.log({ req: req.headers.authorization })
        const token = req?.headers?.authorization?.split(" ")[1]
        if (!token) {
            res.status(201).json({
                message: "Token not found"
            })
        }
        jwt.verify(token, 'your_jwt_secret', function (err, decoded) {
            if (!decoded) {
                return res.status(201).json({
                    message: "Invalid user"
                })
            }
            req.user = decoded;
            next()
        });

        console.log("token", token)
    } catch (err) {
        return res.status(500).json({
            message: "Internal  server error"
        })
    }
}