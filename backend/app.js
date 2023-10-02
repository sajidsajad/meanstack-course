const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

const app = express();

mongoose.connect('mongodb+srv://sajidsajad:OBngrwzgJqXI5pVp@cluster0.p5ebib3.mongodb.net/node-angular?retryWrites=true&w=majority&appName=AtlasApp')
  .then(() => {
    console.log("Connected to database!")
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// ---------------------------   for example purpose ------------------------------------
// app.use((req, res, next) => {
//     next(); // purpose of next() - make the request to continue its journey
// });


// app.use((req, res, next) => {  
//     res.send('Welcome from express!'); // here we stop the request to continue and send  back the response
// });
//-------------------------------------------------------------------------------------

// return a valid express middleware for parsing Json data
app.use(bodyParser.json());
// for parsing URLencoded data and add configuration: "extended: false" - to support only default features in URL encoding
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

//to avoid CORS error issue, set headers:
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;