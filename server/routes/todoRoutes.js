const express = require('express');
const router = express.Router();
const Todo = require('./../Models/Todo');

//Create Todos
router.post('/', async (req , res) => {
    try{
        const data = req.body;
        
        const newTodo = new Todo(data);
        const addTodo = await newTodo.save();
        console.log('Data saved');
        res.status(200).json(addTodo);

    }catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal Server Error'});
    }
})

//Show All Todo
router.get("/", async (req, res) => {
  
    try{
        const todoItem = await Todo.find({});
        res.status(200).json({todos: todoItem});
        console.log(todoItem);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

});

//Search Work
router.get('/:titleType', async(req, res) => {
    try{
       const titleType =  req.params.titleType;
       if( titleType == 'Coding' || titleType == 'Finish Homework' || titleType == 'Take Lunch')       
         {
             const response = await Todo.find({title: titleType});
             console.log("Response Find");
             res.status(200).json(response);
         }else {
             res.status(404).json({error: 'invalid work type'});
         }
 
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
 })



//update Data
//  router.put('/:id', async (req, res) => {
//     try{
//        const todoId = req.params.id;
//        const updatedTodoData = req.body;

//        const response = await Todo.findByIdAndUpdate(todoId, updatedTodoData, {
//          new: true, //Return the Updated Document 
//          runValidators: true, //Run Mongoose validation
//        });

//        if(!response){
//         return res.status(404).json({ error: 'Todo is not found' });
//        }
 
//        console.log('Data Updated');
//        res.status(200).json(response);

//     }catch(err){
//          console.log(err);
//          res.status(500).json({ error: 'Internal Server Error' });
//     }
// })

// Update Data
router.put('/:id', async (req, res) => {
    try {
      const todoId = req.params.id;
      const updatedTodoData = req.body;
      
      const todoExist = await Todo.findOne({_id: todoId});
      
      if (!todoExist) {
        return res.status(404).json({ error: 'Todo is not found' });
      }
  

      const updateTodo = await Todo.findByIdAndUpdate(todoId, updatedTodoData, {
        new: true, // Return the Updated Document 
        //runValidators: true, // Run Mongoose validation
      });
  
      console.log('Data Updated');
      res.status(200).json(response);

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  //Delete todo
  router.delete('/:id', async (req, res) => {
    try{
        const todoId = req.params.id;

        const response = await Todo.findByIdAndDelete(todoId);
        
        if (!response) {
            return res.status(404).json({ error: 'Todo is not found' });
        }

        console.log('Data Deleted');
        res.status(200).json({ message: 'Person Deleted Successfully' });
       
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  })



 module.exports = router;