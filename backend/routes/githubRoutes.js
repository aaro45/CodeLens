const express = require("express");
const router = express.Router();

const { fetchPullRequest } = require("../controllers/githubController");
const auth = require("../middleware/auth");

router.post("/pr", auth, fetchPullRequest);

module.exports = router;