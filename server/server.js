const express = require("express");
const app = express();
var cors = require('cors')
const db = require('./db');
const cookieParser = require('cookie-parser');
const errorMiddleware = require("./middlewares/errorMiddleware");
const bodyParser = require("body-parser");

//Tackel Cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());  
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//app.use(errorMiddleware);

//Import todo Router File
const todoRoutes = require('./routes/todoRoutes');
app.use('/todos', todoRoutes);

//Import todo Router File
const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);

//Import user Router File
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);




let port = 8000;

app.get("/", (req, res) => {
    res.send("You Contacted root Path")
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
