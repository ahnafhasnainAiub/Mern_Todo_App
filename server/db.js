const mongoose = require('mongoose');

const MONGO_URL = "mongodb://127.0.0.1:27017/merntodo";

//Set up MongoDB connection

main()
 .then(() => {
    console.log("Connected to DB");
 })
 .catch((err) => {
    console.log(err);
 });

 async function main(){
    await mongoose.connect(MONGO_URL);
 }

//Get Default Connection

const db = mongoose.connection;

//Define Event Listeners

db.on('Connected', () => {
    console.log("Connected to MongoDB server");
});


db.on('error', () => {
    console.log("MongoDB Connection Error", err);
});


db.on('disconnected', () => {
    console.log("MongoDB server disconnected");
})

module.exports = db;