const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { Schema, model } = mongoose;

const userSchema = new Schema({
   
    name: {
       type: String,
       required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
     },
    password: {
        type: String,
        required: true
     },
     role: {
      type: String,
      enum : ['user','admin'],
      default: 'user'
     }
}, {timestamps: true})

//Secure the password with the bcrypt
userSchema.pre("save", async function(next){
   const user = this;

   if(!user.isModified("password")){
      next();
   }
    
   try{
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(user.password, saltRound);
      user.password = hash_password;

   } catch(err){
      next(err);
   }


});


const User = model("User", userSchema);
module.exports = User;
