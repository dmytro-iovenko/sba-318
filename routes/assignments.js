const express = require("express");
const router = express.Router();

const assignments = require("../data/assignments");

router
  .route("/")
  // Get all assignments
  .get((req, res, next) => {
    res.json(assignments);
  });

module.exports = router;
