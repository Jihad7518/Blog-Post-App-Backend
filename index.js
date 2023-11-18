
const express = require("express");
const app = express();


//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware to parse json request body
app.use(express.json());

//import
const blog = require("./routes/blog");

//mount
app.use("/api/v1", blog);

//connect with DB
const connectWithDB = require("./config/database");
connectWithDB();

//start server
app.listen(PORT, () => {
    console.log(`App started successfully at ${PORT}`);
})

//default route 
app.get("/", (req,res) => {
    res.send(`<h1>This is My Home Page Baby!!!</h1>`)
})
