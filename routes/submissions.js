const express = require("express");
const router = express.Router();
const error = require("../utils/error");

// Get data
const submissions = require("../data/submissions");
const learners = require("../data/learners");
const assignments = require("../data/assignments");

// Validating New Submission Middleware
const validateNewSubmission = (req, res, next) => {
  const { learner_id, assignment_id, submission } = req.body;
  const { submitted_at, score } = submission || {};
  // Check Insufficient Data
  if (!(learner_id && assignment_id && submitted_at && score)) throw error(400, "Insufficient Data");
  // Check Invalid Learner ID
  if (!learners.find((l) => l.id == req.body.learner_id)) throw error(400, "Invalid Learner ID");
  // Check Invalid Assignment ID
  if (!assignments.find((a) => a.id == req.body.assignment_id)) throw error(400, "Invalid Assignment ID");
  // Check Invalid Submitted Date Format
  if (!Date.parse(submitted_at)) throw error(400, "Invalid Submitted Date Format");
  // Check Invalid Submission Score Number
  if (!(Number(score) >= 0)) throw error(400, "Invalid Submission Score Number");
  next();
};

router
  .route("/")
  // Get all submissions
  .get((req, res, next) => {
    res.json(submissions);
  })
  // Create a new submission
  .post(validateNewSubmission, (req, res, next) => {
    const submission = {
      learner_id: req.body.learner_id,
      assignment_id: req.body.assignment_id,
      submission: {
        submitted_at: req.body.submission.submitted_at,
        score: req.body.submission.score,
      },
    };
    submissions.push(submission);
    res.status(201).json(submissions);
  });

module.exports = router;
