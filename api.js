const express = require("express");
const router = express.Router();

// Import custom routes
const courses = require("./api/courses");
const assignments = require("./api/assignments");
const submissions = require("./api/submissions");
const learners = require("./api/learners");

// Routing Middlewares
router.use("/courses", courses);
router.use("/assignments", assignments);
router.use("/submissions", submissions);
router.use("/learners", learners);

module.exports = router;
