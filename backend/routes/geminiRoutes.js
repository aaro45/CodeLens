const express = require("express");

const router = express.Router();
console.log("Gemini routes loaded");

const auth = require("../middleware/auth");

const {
    compareCode,
    reviewPullRequest,
} = require("../controllers/geminiController");

router.post("/compare", auth, compareCode);

router.post("/review-pr", auth, reviewPullRequest);

module.exports = router;