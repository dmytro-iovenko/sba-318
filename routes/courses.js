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
    const response = await axios.get(`${API_URL}/courses`);
    DEBUG && console.debug(response);
    res.render("courses", { title: "Courses", courses: response.data, menuItem: "courses" });
  } catch (err) {
    next(error(500, "Error fetching courses"));
  }
});

module.exports = router;
