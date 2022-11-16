// import express
const express = require("express");
// import dotenv for environment variable configuration
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

// initialize express
const app = express();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
