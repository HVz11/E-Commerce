const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

//DOTENV Config
require("dotenv").config();

//APP
const app = express();

// DATABASE CONNECTION
const DB = process.env.DATABASE;
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err) => {
    console.log("Database error");
  });

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//Routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
