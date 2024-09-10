const express = require("express");
const router = express.Router();
const error = require("../utils/error");

// Get data
const submissions = require("../data/submissions");
const learners = require("../data/learners");
const assignments = require("../data/assignments");
const { route } = require("./courses");

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
  if (!(Date.parse(submitted_at) && submitted_at === new Date(submitted_at).toISOString().split("T")[0]))
    throw error(400, "Invalid Submitted Date Format");
  // Check Invalid Submission Score Number
  if (!(Number(score) >= 0)) throw error(400, "Invalid Submission Score Number");
  next();
};

router
  .route("/")
  // Get all submissions
  .get((req, res, next) => {
    // Passing data through filtering middleware
    req.locals = { submissions };
    next();
    // res.json(submissions);
  })
  // Create a new submission
  .post(validateNewSubmission, (req, res, next) => {
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
  });

router
  .route("/:id")
  // Get a submission with the specified id
  .get((req, res, next) => {
    const submission = submissions.find((s) => s.id == req.params.id);
    if (submission) res.json(submission);
    else next();
  })
  // Update a submission with the specified id
  .patch((req, res, next) => {
    const submission = submissions.find((s, i) => {
      if (s.id == req.params.id) {
        for (const key in req.body) {
          submissions[i][key] = req.body[key];
        }
        return true;
      }
    });
    if (submission) res.json(submission);
    else next();
  })
  // Delete a submission with the specified id
  .delete((req, res, next) => {
    const submission = submissions.find((s, i) => {
      if (s.id == req.params.id) {
        submissions.splice(i, 1);
        return true;
      }
    });
    if (submission) res.json(submission);
    else next();
  });

// Filtering Middleware
router.use((req, res, next) => {
  // Get req.locals (recommended way of passing data through middleware)
  let { submissions } = req.locals || {};
  console.log(submissions);
  // Filter submissions with the specified learnerId
  req.query.learnerId && (submissions = submissions.filter((s) => s.learner_id == req.query.learnerId));
  // Filter submissions with the specified assignmentId
  req.query.assignmentId && (submissions = submissions.filter((s) => s.assignment_id == req.query.assignmentId));
  // Send filtered data
  if (submissions) res.json(submissions);
  else next();
});

module.exports = router;
