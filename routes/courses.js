const express = require("express");
const router = express.Router();

// Get data
const courses = require("../data/courses");

router
  .route("/")
  // Get all courses
  .get((req, res, next) => {
    res.json(courses);
  });

module.exports = router;
