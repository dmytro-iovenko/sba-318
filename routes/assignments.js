const express = require("express");
const router = express.Router();

const assignments = require("../data/assignments");

router
  .route("/")
  // Get all assignments
  .get((req, res, next) => {
    res.json(assignments);
  })
  // Create a new assignment
  .post((req, res, next) => {
    if (req.body.name && req.body.due_at && req.body.points_possible) {
      const assignment = {
        id: assignments.length ? assignments[assignments.length - 1].id + 1 : 1,
        name: req.body.name,
        due_at: req.body.due_at,
        points_possible: req.body.points_possible,
      };
      assignments.push(assignment);
      res.status(201).json(assignments);
    } else throw error(error(400, "Insufficient Data"));
  });

module.exports = router;
