const express = require("express");

const router = express.Router();
const {
  getQuizzes,
  getQuizQuestions,
  getAnswers,
} = require("../controllers/user");

router.route("/quizzes").get(getQuizzes);
router.route("/quizzes/:quiz_id").get(getQuizQuestions);

router.route("/result/:quiz_id").get(getAnswers);

module.exports = router;
