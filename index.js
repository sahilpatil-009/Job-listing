const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectToDB = require("./dbConnect/dbConnect.js");

dotenv.config({})
const port = process.env.PORT || 3000;

connectToDB();

app.listen(port, ()=>{
    console.log(`app listen on port ${port}`);
});