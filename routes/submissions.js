// Import Express module and create a new router object
const express = require("express");
const router = express.Router();

// Import axios for making HTTP requests
const axios = require("axios");

// Import from config file
const { API_URL, DEBUG } = require("../utils/config");

// Import helper function for handling errors
const error = require("../utils/error");

// Render all courses
router.get("/", async function (req, res, next) {
  try {
    const response = await axios.get(`${API_URL}/submissions`);
    DEBUG && console.debug(response);
    res.render("submissions", { title: "Submissions List", submissions: response.data, menuItem: "submissions" });
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
    next(error(500, 'Error fetching submission (id:${id})'));
  }
});

module.exports = router;
