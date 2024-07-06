const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const todoSchema = new Schema({
    title: {
       type: String,
       required: true
    },
    date: {
        type: Date,
        required: true
     },
    time: {
        type: String,
        required: true
     },
}, {timestamps: true});

const Todo = model("Todo", todoSchema);
module.exports = Todo;
