const express = require('express');
const app = express()
const Port = process.env.Port || 3002
const cors = require("cors");
const path = require('path')
const bodyParser = require('body-parser')
const createError = require('http-errors')

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to SideHustle Node REST API with express." });
});

require("./src/routes/user.router.js")(app);
require("./src/routes/property.router.js")(app);



// Handling Errors
app.use((err, req, res, next)=>{
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});



app.listen(Port, ()=>{
    console.log(`Server listening on Port ${Port}`)

});