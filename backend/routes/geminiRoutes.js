const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const { compareCode } = require("../controllers/geminiController");

router.post("/compare", auth, compareCode);

module.exports = router;