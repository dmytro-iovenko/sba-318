const express = require("express");
const router = express.Router();

// Get data
const learners = require("../data/learners");

router
  .route("/")
  // Get all learners
  .get((req, res, next) => {
    res.json(learners);
  });

module.exports = router;
