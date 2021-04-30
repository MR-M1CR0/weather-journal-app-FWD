// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Listen Port
const port = 4800;
app.listen(port, () => {
  console.log(`Server Running On: http://localhost:${port}`);
});

// Get All Data
app.get("/all", (request, response) => {
  response.send(projectData).status(200).end();
});

// Post Data
app.post("/postData", (request, response) => {
  projectData = {
    temp: request.body.temp,
    date: request.body.date,
    content: request.body.content,
  };
  response.send(projectData).status(404).end();
});
