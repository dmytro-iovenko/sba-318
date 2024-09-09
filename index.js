const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const error = require("./utils/error");

// Import custom routes
const api = require("./api");

// Get data
const courses = require("./data/courses");
const assignments = require("./data/assignments");
const learners = require("./data/learners");
const submissions = require("./data/submissions");

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

// // Routing Middlewares
// app.use("/api/courses", courses);
// app.use("/api/assignments", assignments);
// app.use("/api/submissions", submissions);
// app.use("/api/learners", learners);

// Use all API routes with the /api prefix
app.use("/api", api);

// Set the view engine to ejs
app.set("view engine", "ejs");

// Courses page
app.get("/courses", function (req, res) {
  const options = {
    title: "Courses",
    courses,
  };
  res.render("courses", options);
});

// Assignments page
app.get("/assignments", function (req, res) {
  const options = {
    title: "Assignments",
    assignments,
  };
  res.render("assignments", options);
});

// Learners page
app.get("/learners", function (req, res) {
  const options = {
    title: "Learners",
    learners,
  };
  res.render("learners", options);
});

// Submissions page
app.get("/submissions", function (req, res) {
  const options = {
    title: "Submissions",
    submissions,
  };
  res.render("submissions", options);
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
