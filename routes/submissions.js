const express = require("express");
const router = express.Router();

// Get data
const submissions = require("../data/submissions");

router
  .route("/")
  // Get all submissions
  .get((req, res, next) => {
    res.json(submissions);
  });

module.exports = router;
