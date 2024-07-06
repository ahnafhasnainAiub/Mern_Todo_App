const express = require('express');
const router = express.Router();
const User = require('./../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { authMiddleware } = require("../middlewares/authMiddleware");
const { verifyToken } = require('../middlewares/ownerMiddleware');
const { authorize } = require('../middlewares/authorizeMiddleware');


const generateToken = (id, email, role)=>{
  return jwt.sign(
            { id, email, role },
            'shhhh', //process.env.jwtsecret
            {
              expiresIn: "1h"
            }
          );
}

//Create User (Registration)
router.post('/signup', async (req , res) => {
    
  try{
       // const userData = req.body;
       const {name, email, password:passwordUser, role} = req.body;

        const userExist = await User.findOne({ email: email });
         if(userExist){
           return res.status(400).json({ msg: "Email already exist" });
         }
  

          const user = await User.create({ name, email, password:passwordUser, role});
          console.log('user', user)

        
        const token = generateToken(user._id,user.email, user.role);

        const { password, ...others } = user._doc;
  
        res.status(200).json({ message: "Congratulations! Registration Successful", token, data: others });
  
   
        //console.log(user);
        // console.log('User saved');
        // res.status(200).json(user);

    }catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal Server Error'});
    }
})



//User Login 
router.post('/login', async (req, res) => {
  

  try {
    const { email, password:passwordUser} = req.body;
      const user = await User.findOne({ email });
      
      if (!user) {
          return res.status(200).json({ message: "Please Sign-Up First!!" });
      }

      console.log('user', user)

      // check if password is match or not with user's password from database
      const isPasswordCorrect = await bcrypt.compare(
        passwordUser,
        user.password
      );

      // check if password is correct or not
      if (!isPasswordCorrect) {
          return res.status(200).json({ message: "Password or Email is not correct!!" });
      }

      if(isPasswordCorrect){

      const token = generateToken(user._id,user.email, user.role);

      const { password, ...others } = user._doc;

      res.status(200).json({ message: "Login Successful", token, data: others });

      }
      
      
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error!!" });
  }
});


//Login User Data 
router.get("/owner", authMiddleware, async (req, res) => {
    try{
      
      const userData =  req.user;
      console.log(userData);
      return res.status(200).json({ userData });

    }catch(error){
      console.log(`Error from user router ${error}`);
    }
})


//Show All Users
router.get("/", async (req, res) => {
  
    try{

      const { name, sort } = req.query;
      const queryObject = {}; 
        
      let apiData = User.find(queryObject);
      
      if(sort){
        let sortUser = sort.replace(",", " ");
        apiData = apiData.sort(sortUser);
      }

      console.log(queryObject);



        const userItem = await apiData;
        res.status(200).json({users: userItem});
        console.log(userItem);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

});



//get one user
router.get('/:id',authMiddleware, async (req, res) => {

  try {
 
    const id = req.params.id;
    const userExist = await User.findById(id);

    if(!userExist){
      return res.status(404).json({msg: "User not found"});
    }
    res.status(200).json(userExist)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
   

// Update Users
router.put('/:id',authMiddleware, async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;
      
      const userExist = await User.findOne({_id: userId});
      
      if (!userExist) {
        return res.status(404).json({ error: 'User is not found' });
      }
  

      const updateUser = await User.findByIdAndUpdate(userId, updatedUserData, {
        new: true, // Return the Updated Document 
        //runValidators: true, // Run Mongoose validation
      });
  
      console.log('Data Updated');
      res.status(200).json(updateUser);

    } catch (err) {
      console.log(err);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  });
  



//Delete todo
router.delete('/:id',authMiddleware, async (req, res) => {
    try{
        const userId = req.params.id;

        const response = await User.findByIdAndDelete(userId);
        
        if (!response) {
            return res.status(404).json({ error: 'User is not found' });
        }

        console.log('User Deleted');
        res.status(200).json({ message: 'Person Deleted Successfully' });
       
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });



  module.exports = router;