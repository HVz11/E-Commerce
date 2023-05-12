const express = require("express");
const mongoose = require("mongoose");

//DOTENV Config
require("dotenv").config();

//APP
const app = express();

// DATABASE CONNECTION
const DB = process.env.DATABASE;
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database connected.");
}).catch((err) => {
    console.log("Database error");
});


//routes
app.get("/", (req, res) => {
  res.send("hello from node ");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
