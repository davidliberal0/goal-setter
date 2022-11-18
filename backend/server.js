// import express
const express = require("express");
const colors = require("colors");
// import dotenv for environment variable configuration
const dotenv = require("dotenv").config();

// import middleware error handler
const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");

connectDB();

const port = process.env.PORT || 5000;

// initialize express
const app = express();

// middlware for handling reading information in body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mount routes to middleware express function - everytime a url hits check its route
app.use("/api/goals", require("./routes/goalRoutes"));

// middleware for handling errors
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
