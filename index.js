const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;
const API_URL = "http://localhost:3000/api";
const DEBUG = false;

const error = require("./utils/error");

// Import custom routes
const api = require("./api");

// Parsing Body Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Logging Middleware
app.use((req, res, next) => {
  const time = new Date().toLocaleString();
  console.log("-----");
  console.log(`${time}: Received a ${req.method} request to ${req.url}.`);
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Use all API routes with the /api prefix
app.use("/api", api);

// Set the view engine to ejs
app.set("view engine", "ejs");

// Courses page
app.get("/courses", async function (req, res, next) {
  try {
    const response = await axios.get(`${API_URL}/courses`);
    DEBUG && console.debug(response);
    res.render("courses", { title: "Courses", courses: response.data, menuItem: "courses" });
  } catch (err) {
    next(error(500, "Error fetching courses"));
  }
});

// Assignments page
app.get("/assignments", async function (req, res, next) {
  try {
    const response = await axios.get(`${API_URL}/assignments`);
    DEBUG && console.debug(response);
    res.render("assignments", { title: "Assignments", assignments: response.data, menuItem: "assignments" });
  } catch (err) {
    next(error(500, "Error fetching assignments"));
  }
});

// Learners page
app.get("/learners", async function (req, res, next) {
  try {
    const response = await axios.get(`${API_URL}/learners`);
    DEBUG && console.debug(response);
    res.render("learners", { title: "Learners", learners: response.data, menuItem: "learners" });
  } catch (err) {
    next(error(500, "Error fetching learners"));
  }
});

// Submissions page
app.get("/submissions", async function (req, res, next) {
  try {
    const response = await axios.get(`${API_URL}/submissions`);
    DEBUG && console.debug(response);
    res.render("submissions", { title: "Submissions", submissions: response.data, menuItem: "submissions" });
  } catch (err) {
    next(error(500, "Error fetching submissions"));
  }
});

// 404 Middleware
app.use((req, res, next) => {
  throw error(404, "Resource Not Found");
});

// Error-handling Middleware
// Any call to next() that includes an Error() will skip regular middleware
// and only be processed by error-handling middleware.
app.use((err, req, res, next) => {
  const time = new Date();
  res.status(err.status || 500);
  res.json({
    status: err.status,
    error: err.message,
    timestamp: time.toISOString(),
    path: req.url,
  });
  // Log non-standard (server) errors
  !err.status && console.error(`${time.toLocaleString()}: ${err.stack}`);
});

// Start express server
app.listen(3000, () => {
  console.log("Server is running on port:", port);
});
