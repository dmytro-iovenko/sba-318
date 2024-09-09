const express = require("express");
const router = express.Router();

const assignments = require("../data/assignments");
const error = require("../utils/error");

// Validating New Assignment Middleware
const validateNewAssignment = (req, res, next) => {
  const { name, due_at, points_possible } = req.body;
  // Check Insufficient Data
  if (!(name, due_at, points_possible)) throw error(400, "Insufficient Data");
  // Check Invalid Name (empty string)
  if (name.trim().length === 0) throw error(400, "Invalid Name");
  // Check Invalid Due Date Format
  if (!(Date.parse(due_at) && due_at === new Date(due_at).toISOString().split("T")[0]))
    throw error(400, "Invalid Due Date Format");
  // Check Invalid Points Possible Number
  if (!(Number(points_possible) >= 0)) throw error(400, "Invalid Points Possible Number");
  next();
};

router
  .route("/")
  // Get all assignments
  .get((req, res, next) => {
    res.json(assignments);
  })
  // Create a new assignment
  .post(validateNewAssignment, (req, res, next) => {
    const assignment = {
      id: assignments.length ? assignments[assignments.length - 1].id + 1 : 1,
      name: req.body.name,
      due_at: req.body.due_at,
      points_possible: req.body.points_possible,
    };
    assignments.push(assignment);
    res.status(201).json(assignments);
  });

router
  .route("/:id")
  // Get an assigment with the specified id
  .get((req, res, next) => {
    const assignment = assignments.find((a) => a.id == req.params.id);
    if (assignment) res.json(assignment);
    else next();
  })
  // Update an assigment with the specified id
  .patch((req, res, next) => {
    const assignment = assignments.find((a, i) => {
      if (a.id == req.params.id) {
        for (const key in req.body) {
          assignments[i][key] = req.body[key];
        }
        return true;
      }
    });
    if (assignment) res.json(assignment);
    else next();
  })
  // Delete an assigment with the specified id
  .delete((req, res, next) => {
    const assignment = assignments.find((a, i) => {
      if (a.id == req.params.id) {
        assignments.splice(i, 1);
        return true;
      }
    });
    if (assignment) res.json(assignment);
    else next();
  });
module.exports = router;
