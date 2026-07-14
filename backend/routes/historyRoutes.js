const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  getHistory,
  deleteHistory,
} = require("../controllers/historyController");

router.get("/", auth, getHistory);

router.delete("/:id", auth, deleteHistory);

module.exports = router;
