const express = require("express");
const router = express.Router();
const error = require("../utils/error");

// Get data
const learners = require("../data/learners");

router
  .route("/")
  // Get all learners
  .get((req, res, next) => {
    res.json(learners);
  })
  // Create a new learner
  .post((req, res, next) => {
    if (req.body.name && req.body.name.first_name && req.body.name.last_name && req.body.email) {
      if (learners.find((l) => l.email.toLowerCase() === req.body.email.toLowerCase())) {
        throw error(409, "Email Already Registered");
      }
      const learner = {
        id: learners.length ? learners[learners.length - 1].id + 1 : 1,
        name: {
          first_name: req.body.name.first_name,
          last_name: req.body.name.last_name,
        },
        email: req.body.email,
      };
      learners.push(learner);
      res.status(201).json(learners);
    } else throw error(400, "Insufficient Data");
  });

module.exports = router;
