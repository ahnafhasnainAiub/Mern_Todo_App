const express = require('express');
const router = express.Router();
const Task = require('./../Models/Task');
const user = require('./../Models/Task');

const { authMiddleware } = require("../middlewares/authMiddleware");
const { verifyToken } = require('../middlewares/ownerMiddleware');
const { ownerShip } = require('../middlewares/ownerShipMiddleware');

//Create Task
router.post('/', authMiddleware, async (req , res) => {
    try{
        const data = req.body;

        console.log({user: req.user})
        
        const newTask = new Task(data);
        const addTask = await newTask.save();
        console.log('Data saved');
        res.status(200).json(addTask);

    }catch(error){
       console.log(error);
       res.status(500).json({error: 'Internal Server Error'});
    }
})

//Show All Task
router.get("/", authMiddleware,  async (req, res) => {
      
    try{
       
        const { title, status } = req.query;
        const queryObject = {}; 

        if(title){

          queryObject.title = { $regex: title, $options: "i" };
          console.log(queryObject);
        
        }

        if(status){
          queryObject.status = status;
          console.log(queryObject);
        }

        const taskItem = await Task.find(queryObject).populate("user");
        
        res.status(200).json({tasks: taskItem});
        console.log(taskItem);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

});

//Get one task by ID
router.get('/:id', async (req, res) => {

  try {
 
    const id = req.params.id;
    const taskExist = await Task.findById(id);

    if(!taskExist){
      return res.status(404).json({msg: "Task not found"});
    }
    res.status(200).json(taskExist)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Update Task
router.put('/:id',  async (req, res) => {
    try {
      
      const taskId = req.params.id;
      const updatedTaskData = req.body;
      
      const taskExist = await Task.findOne({_id: taskId});
      
      if (!taskExist) {
        return res.status(404).json({ error: 'Task is not found' });
      }
  

      const updatetask = await Task.findByIdAndUpdate(taskId, updatedTaskData, {
        new: true, // Return the Updated Document 
        //runValidators: true, // Run Mongoose validation
      });
  
      console.log('Data Updated');
      res.status(200).json({msg: "User Updated Succesfully"});

    } catch (err) {
      console.log(err);
      res.status(500).json({ err: 'Internal Server Error' });
    }
  });



//Delete Task
router.delete('/:id',authMiddleware,  async (req, res) => {
    try{
        const taskId = req.params.id;

        const response = await Task.findByIdAndDelete(taskId);
        
        if (!response) {
            return res.status(404).json({ error: 'task is not found' });
        }

        console.log('task Deleted');
        res.status(200).json({ message: 'Task Deleted Successfully' });
       
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });


module.exports = router;