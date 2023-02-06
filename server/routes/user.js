const express = require("express");
const {verifyToken} = require('../middlewares/auth')

const router = express.Router();
const {
  getQuizzes,
  getQuizQuestions,
  getAnswers,
} = require("../controllers/user");


router.use('/:user_id',verifyToken);
router.route("/:user_id/quizzes").get(getQuizzes);
router.route("/:user_id/quizzes/:quiz_id").get(getQuizQuestions);

router.route("/:user_id/result/:quiz_id").get(getAnswers);

module.exports = router;
