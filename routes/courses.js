const express = require("express");
const router = express.Router();
const error = require("../utils/error");

// Get data
const courses = require("../data/courses");

router
  .route("/")
  // Get all courses
  .get((req, res, next) => {
    res.json(courses);
  })
  // Create a new course
  .post((req, res, next) => {
    if (req.body.name) {
      const course = {
        id: courses.length ? courses[courses.length - 1].id + 1 : 1,
        name: req.body.name,
      };
      courses.push(course);
      res.status(201).json(courses);
    } else throw error(400, "Insufficient Data");
  });

module.exports = router;
