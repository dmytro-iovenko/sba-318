// Import Express module and create a new router object
const express = require("express");
const router = express.Router();

// Import axios for making HTTP requests
const axios = require("axios");

// Import from config file
const { API_URL, DEBUG } = require("../utils/config");

// Import helper function for handling errors
const error = require("../utils/error");

// Render all assignments
router.get("/", async function (req, res, next) {
  try {
    const response = await axios.get(`${API_URL}/assignments`);
    DEBUG && console.debug(response);
    res.render("assignments", { title: "Assignments List", assignments: response.data, menuItem: "assignments" });
  } catch (err) {
    next(error(500, "Error fetching assignments"));
  }
});

// Render New Assignment form
router.get("/new", async function (req, res, next) {
  try {
    res.render("assignments/new", { title: "Create a new assignment", menuItem: "assignments" });
  } catch (err) {
    next(error(500, "Error fetching courses"));
  }
});

module.exports = router;
