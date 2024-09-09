const express = require("express");
const router = express.Router();

// Import custom routes
const courses = require("./routes/courses");
const assignments = require("./routes/assignments");
const submissions = require("./routes/submissions");
const learners = require("./routes/learners");

// Routing Middlewares
router.use("/courses", courses);
router.use("/assignments", assignments);
router.use("/submissions", submissions);
router.use("/learners", learners);

module.exports = router;
