const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
    title: {
       type: String,
       required: true
    },
    describe: {
        type: String,
        required: true
     },
   status: {
       type: String,
       enum : ["Pending", "Complete"],
       default: "Pending",
     },
 
   user: {
       type: Schema.Types.ObjectId,
       ref: "User",
     },
}, {timestamps: true});

const Task = model("Task", taskSchema);
module.exports = Task;
