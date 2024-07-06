const User = require("../Models/userModel")

 const authorize = (role = ['admin']) => async (req, res, next) => {
  
console.log('req.user.role', req.user.role)
    if (role.includes(req.user.role) ) {
        return next()
    }

    res.json({message: 'Unauthorized'});
}


module.exports = {
    authorize
}