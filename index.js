const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

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

// Import custom routes
const courses = require("./routes/courses");
const assignments = require("./routes/assignments");
const submissions = require("./routes/submissions");
const learners = require("./routes/learners");

// Set the view engine to ejs
app.set("view engine", "ejs");

// Use routes to render pages
app.use("/courses", courses);
app.use("/assignments", assignments);
app.use("/learners", learners);
app.use("/submissions", submissions);

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
