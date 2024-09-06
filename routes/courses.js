const express = require("express");
const router = express.Router();
const error = require("../utils/error");

// Get data
const courses = require("../data/courses");

// Validating New Course Middleware
const validateNewCourse = (req, res, next) => {
  const { name } = req.body;
  // Check Insufficient Data
  if (!name) throw error(400, "Insufficient Data");
  // Check Invalid Name (empty string)
  if (name.trim().length === 0) throw error(400, "Invalid Name");
  next();
};

router
  .route("/")
  // Get all courses
  .get((req, res, next) => {
    res.json(courses);
  })
  // Create a new course
  .post(validateNewCourse, (req, res, next) => {
    const course = {
      id: courses.length ? courses[courses.length - 1].id + 1 : 1,
      name: req.body.name,
    };
    courses.push(course);
    res.status(201).json(courses);
  });

module.exports = router;
