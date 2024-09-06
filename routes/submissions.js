const express = require("express");
const router = express.Router();
const error = require("../utils/error");

// Get data
const submissions = require("../data/submissions");
const learners = require("../data/learners");
const assignments = require("../data/assignments");

router
  .route("/")
  // Get all submissions
  .get((req, res, next) => {
    res.json(submissions);
  })
  // Create a new submission
  .post((req, res, next) => {
    if (
      req.body.learner_id &&
      req.body.assignment_id &&
      req.body.submission &&
      req.body.submission.submitted_at &&
      req.body.submission.score
    ) {
      if (!learners.find((l) => l.id == req.body.learner_id)) throw error(400, "Invalid Learner ID");
      if (!assignments.find((a) => a.id == req.body.assignment_id)) throw error(400, "Invalid Assignment ID");
      const submission = {
        id: submissions.length ? submissions[submissions.length - 1].id + 1 : 1,
        learner_id: req.body.learner_id,
        assignment_id: req.body.assignment_id,
        submission: {
          submitted_at: req.body.submission.submitted_at,
          score: req.body.submission.score,
        },
      };
      submissions.push(submission);
      res.status(201).json(submissions);
    } else throw error(400, "Insufficient Data");
  });

module.exports = router;
