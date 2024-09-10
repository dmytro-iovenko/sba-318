// Import Express module and create a new router object
const express = require("express");
const router = express.Router();

// Import axios for making HTTP requests
const axios = require("axios");

// Import from config file
const { API_URL, DEBUG } = require("../utils/config");

// Import helper function for handling errors
const error = require("../utils/error");

// Filtering Middleware
function filterSubmissions(req, res, next) {
  req.locals = {};
  req.query.learnerId && (req.locals.learnerId = req.query.learnerId);
  req.query.assignmentId && (req.locals.assignmentId = req.query.assignmentId);
  next();
}

// Render submissions
router.get("/", filterSubmissions, async function (req, res, next) {
  try {
    // Build query string if any
    const queries = [];
    for (const key in req.locals) {
      queries.push(`${key}=${req.locals[key]}`);
    }
    const query = queries.length ? "?" + queries.join("&") : "";
    console.log(`${API_URL}/submissions${query}`);

    const response = await axios.get(`${API_URL}/submissions${query}`);
    DEBUG && console.debug(response);
    res.render("submissions", { title: "Submissions List", submissions: response.data, filter: req.locals, menuItem: "submissions" });
  } catch (err) {
    next(error(500, "Error fetching submissions"));
  }
});

// Render New Submission form
router.get("/new", async function (req, res, next) {
  try {
    res.render("submissions/new", { title: "Create a new submission", menuItem: "submissions" });
  } catch (err) {
    next(error(500, "Error fetching courses"));
  }
});

// Render Edit Submission form
router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const response = await axios.get(`${API_URL}/submissions/${id}`);
    DEBUG && console.debug(response);
    res.render("submissions/edit", { title: "Edit Submission", submission: response.data, menuItem: "submissions" });
  } catch (err) {
    next(error(500, "Error fetching submission (id:${id})"));
  }
});

module.exports = router;
