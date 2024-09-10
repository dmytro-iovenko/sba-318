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
    res.render("courses", { title: "Courses List", courses: response.data, menuItem: "courses" });
  } catch (err) {
    next(error(500, "Error fetching courses"));
  }
});

// Render New Course form
router.get("/new", async function (req, res, next) {
  try {
    res.render("courses/new", { title: "Create a new course", menuItem: "courses" });
  } catch (err) {
    next(error(500, "Error fetching courses"));
  }
});

// Render Edit Course form
router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const response = await axios.get(`${API_URL}/courses/${id}`);
    DEBUG && console.debug(response);
    res.render("courses/edit", { title: "Edit Course", course: response.data, menuItem: "courses" });
  } catch (err) {
    next(error(500, 'Error fetching course (id:${id})'));
  }
});

module.exports = router;
